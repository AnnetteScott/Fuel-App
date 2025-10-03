<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

setOptions({
	key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	v: "weekly",
});

let map = null as null | google.maps.Map

const temp = [
	{
		location: {
			lat: -36.90532,
			lng: 174.92347,
		},
		price: "10"
	},
	{
		location: {
			lat: -36.90572,
			lng: 174.93347,
		},
		price: "10"
	}
]

export default defineComponent({
	name: 'MapPage',
	data() {
		return {
		};
	},
	async mounted() {
		const mapEl = document.getElementById("map");
		const location = { lat: -36.90532, lng: 174.92347 }
		const { Map } = await importLibrary("maps");

		if(!mapEl){
			return;
		}

		map = new Map(mapEl, {
			center: location,
			zoom: 12,
			mapId: 'DEMO_MAP_ID',
		});
		this.placeStations()
	},
	methods: {
		async placeStations() {
			const { PinElement, AdvancedMarkerElement } = await importLibrary("marker");
			temp.forEach(s => {
				const stationTag = document.createElement('div');
				stationTag.className = 'station-tag';
				stationTag.textContent = s.price;
			
				const marker = new AdvancedMarkerElement({
					map,
					position: s.location,
					content: stationTag,
				});

				marker.addListener('click', () => {
					console.log("Click")
				});
			})
		}
	},
})
</script>


<template>
	<ion-page>
		<HeaderBar name="Map" />
		<ion-content>
			<div id="map"></div>
		</ion-content>
	</ion-page>
</template>

<style>
#map {
	height: 100%;
}

.station-tag {
	background-color: #4285F4;
	border-radius: 8px;
	color: #FFFFFF;
	font-size: 14px;
	padding: 10px 15px;
	position: relative;
	transform: translateY(-8px);
}

.station-tag::after {
	content: "";
	position: absolute;
	left: 50%;
	top: 100%;
	transform: translate(-50%, 0);
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 8px solid #4285F4;
}
</style>