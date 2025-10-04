import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export class GoogleMap {
	public static map = null as null | google.maps.Map
	public static location = { pos: { lat: -36.85152, lng: 174.76456 }, default: true }

	public static getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
				this.location.pos.lat = position.coords.latitude;
				this.location.pos.lng = position.coords.longitude;
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

	private static getStations() {
		return [
			{
				name: "Gull",
				pos: {
					lat: -36.87418,
					lng: 174.67000
				},
				"91": 2.589,
				"95": 2.689,
				"98": 2.789,
				"Diesel": 1.749
			},
			{
				name: "Gull",
				pos: {
					lat: -36.87217,
					lng: 174.66950
				},
				"91": 2.589,
				"95": 2.689,
				"98": 2.789,
				"Diesel": 1.749
			}
		]
	}

	private static async displayStations() {
		const { PinElement, AdvancedMarkerElement } = await importLibrary("marker");
		const stations = this.getStations();

		stations.forEach(s => {
			const priceTag = document.createElement('div');
			priceTag.className = 'station-tag';
			priceTag.textContent = s[91].toString();

			new AdvancedMarkerElement({
				map: this.map,
				position: s.pos,
				content: priceTag,
  			});
		})
	}

	
}