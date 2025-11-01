export interface VehicleData {
	fuelEfficiency: number; // km per litre
	tankCapacity: number;   // liters
	currentFuel: number; // 0–100
}

export interface StationData {
	name: string;
	pos: google.maps.LatLngLiteral;
	fuel: {
		"91": number;
		"95": number;
		"98": number;
		"Diesel": number;
	}
}

export interface RouteEvaluation {
	station: StationData;
	routeKm: number;
	fuelNeededL: number;
	fuelCost: number;
	request: google.maps.DirectionsResult
}