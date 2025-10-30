import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { Firebase } from "./firebase";
import { FuelOptimizer } from "./FuelOptimizer";

export class GoogleMap {
	public static map = null as null | google.maps.Map
	public static location = { pos: { lat: -36.85152, lng: 174.76456 }, default: true }
	public static destination = { pos: { lat: -36.87154, lng: 174.66625 } as google.maps.LatLngAltitudeLiteral}
	public static directionsService: google.maps.DirectionsService | null = null;
	public static directionsRenderer: google.maps.DirectionsRenderer | null = null;

	public static getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
				this.location.pos.lat = position.coords.latitude;
				this.location.pos.lng = position.coords.longitude;
				this.location.default = false;
				
				if(this.map) {
					this.setLocationMarker()
				}
			}, 
			() => { //Error
				this.location.pos.lat = -36.88382;
				this.location.pos.lng = 174.73803;
				this.location.default = false;

				if(this.map) {
					this.setLocationMarker()
				}
			});
		}
	}
	
	public static async initMap(mapEl: HTMLElement | null) {
		setOptions({
			key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
			v: "weekly",
		});
		const { Map } = await importLibrary("maps");
		if(!mapEl) return;
		
		console.log(this.location)
		this.map = new Map(mapEl, {
			center: this.location.pos,
			zoom: 11,
			mapId: 'Fuel_Map_ID',
			disableDefaultUI: true,
			zoomControl: true
		});

		const { DirectionsService, DirectionsRenderer } = (await importLibrary("routes")) as google.maps.RoutesLibrary;
		this.directionsService = new DirectionsService();
		this.directionsRenderer = new DirectionsRenderer({ map: this.map });

		this.displayStations();

		if(!this.location.default) {
			this.setLocationMarker()
		}
	}

	private static async setLocationMarker() {
		const { PinElement, AdvancedMarkerElement } = await importLibrary("marker");
		this.map?.setCenter(this.location.pos)
		this.map?.setZoom(13)

		const locationTag = document.createElement('div');
		locationTag.className = 'current_location';

		new AdvancedMarkerElement({
			map: this.map,
			position: this.location.pos,
			content: locationTag,
		});
	}

	private static async displayStations() {
		const { AdvancedMarkerElement } = await importLibrary("marker");
		
		const checkStations = () => {
			const stations = Firebase.stations.value;
			if (!stations || stations.length === 0) return;

			stations.forEach((s: any) => {
				const priceTag = document.createElement("div");
				priceTag.className = "station-tag";
				priceTag.textContent = s.fuel["91"].toString();

				new AdvancedMarkerElement({
					map: this.map!,
					position: s.pos,
					content: priceTag,
				});
			});
		};

		const interval = setInterval(() => {
			if (Firebase.stations.value && Firebase.stations.value.length > 0) {
				clearInterval(interval);
				checkStations();
			}
		}, 500);
	}

	public static async initComplete() {
		if(!this.map) return;

		let marker: google.maps.marker.AdvancedMarkerElement;
		let infoWindow: google.maps.InfoWindow;

		// Request needed libraries.
		//@ts-ignore
		const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
			google.maps.importLibrary("marker"),
			google.maps.importLibrary("places")
		]);

		
		const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({});
		placeAutocomplete.id = 'place-autocomplete-input';
		placeAutocomplete.locationBias = this.location.pos;

		const card = document.getElementById('place-autocomplete-card') as HTMLElement;
		card.appendChild(placeAutocomplete);
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

		// Create the marker and infowindow.
		marker = new google.maps.marker.AdvancedMarkerElement({
			map: this.map,
		});

		infoWindow = new google.maps.InfoWindow({});

		// Add the gmp-placeselect listener, and display the results on the map.
		//@ts-ignore
		placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
			const place = placePrediction.toPlace();
			await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] });

			if(!this.map) return;

			// If the place has a geometry, then present it on a map.
			if (place.viewport) {
				this.map.fitBounds(place.viewport);
			} else {
				this.map.setCenter(place.location);
			}

			marker.position = place.location;
		});
	}
}