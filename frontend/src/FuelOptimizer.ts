import { Firebase } from "./firebase";
import { GoogleMap } from "./MapManager";
import { RouteEvaluation } from "./types";


export class FuelOptimizer {
	public async evaluateStations(destination: {lat: number, lng: number}){
		if(!GoogleMap.directionsService){
			return;
		}

		const results = [] as RouteEvaluation[];

		const baseRoute = await GoogleMap.directionsService.route({
			origin: GoogleMap.location.pos,
			destination,
			travelMode: google.maps.TravelMode.DRIVING
		});

		const vehicle = Firebase.userData.value;
		const vehicleRange = vehicle.currentFuel * vehicle.fuelEfficiency;

		for(const station of Firebase.stations.value) {
			const stationRoute = await GoogleMap.directionsService!.route({
				origin: GoogleMap.location.pos,
				destination,
				waypoints: [{ location: station.pos, stopover: true }],
				optimizeWaypoints: false,
				travelMode: google.maps.TravelMode.DRIVING,
			});

			const toStation = (stationRoute.routes[0].legs[0].distance?.value ?? 0) / 1000;
			if(toStation > vehicleRange){
				continue;
			}
			
			let routeKm = 0;
			for(const leg of stationRoute.routes[0].legs){
				routeKm += (leg.distance?.value ?? 0) / 1000;
			}

			const fuelNeededL = parseFloat((routeKm / vehicle.fuelEfficiency).toFixed(2));
			const fuelCost = parseFloat((fuelNeededL * station.fuel[91]).toFixed(2));

			results.push({
				station,
				routeKm,
				fuelNeededL,
				fuelCost,
				request: stationRoute
			});
		}

		const pick = results.sort((a, b) => a.fuelCost < b.fuelCost ? -1 : 1)
		GoogleMap.directionsRenderer?.setDirections(pick[0].request);

		return pick[0];
	}
}