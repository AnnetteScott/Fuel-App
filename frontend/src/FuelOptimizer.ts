import { Firebase } from "./firebase";
import { GoogleMap } from "./MapManager";
import { RouteEvaluation } from "./types";


export class FuelOptimizer {
	public async evaluateStations(destination: google.maps.LatLngAltitudeLiteral){
		if(!GoogleMap.directionsService){
			return;
		}

		const results = [] as RouteEvaluation[];

		const baseRoute = await GoogleMap.directionsService.route({
			origin: GoogleMap.location.pos,
			destination,
			travelMode: google.maps.TravelMode.DRIVING
		});

		const baseDistanceKm = (baseRoute.routes[0].legs[0].distance?.value ?? 0) / 1000;
		console.log(baseDistanceKm);

		const vehicle = Firebase.userData.value;
		const vehicleRange = vehicle.currentFuel * vehicle.tankCapacity;

		for(const station of Firebase.stations.value) {
			const stationRoute = await GoogleMap.directionsService!.route({
				origin: GoogleMap.location.pos,
				destination,
				waypoints: [{ location: station.pos, stopover: true }],
				optimizeWaypoints: false,
				travelMode: google.maps.TravelMode.DRIVING,
			});

			let routeKm = 0;
			for(const leg of stationRoute.routes[0].legs){
				routeKm += (leg.distance?.value ?? 0) / 1000;
			}
			console.log("km", routeKm);

			const fuelNeededL = parseFloat((routeKm / vehicle.fuelEfficiency).toFixed(2));
			const fuelCost = parseFloat((fuelNeededL * station.fuel[91]).toFixed(2));
			console.log(fuelNeededL, fuelCost)

			results.push({
				station,
				routeKm,
				fuelNeededL,
				fuelCost,
			});
		}

		console.log(results)
	}
}