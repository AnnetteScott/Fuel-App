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

export default defineComponent({
	name: 'MapPage',
	data() {
		return {
			map: null as google.maps.Map | null,
		};
	},
	mounted() {
		this.initMap()
	},
	methods: {
		async initMap() {
			const mapEl = document.getElementById("map");
			const location = { lat: -36.90532, lng: 174.92347 }

			if(!mapEl){
				return;
			}
			const { Map } = await importLibrary("maps");
			const { PinElement, AdvancedMarkerElement } = await importLibrary("marker");
			const map = new Map(mapEl, {
				center: location,
				zoom: 8,
				mapId: 'DEMO_MAP_ID',
			});


			const priceTag = document.createElement('div');
			priceTag.className = 'price-tag';
			priceTag.textContent = '$2.5M';

			const marker = new AdvancedMarkerElement({
				map,
				position: location,
				content: priceTag,
			});
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

.price-tag {
	background-color: #4285F4;
	border-radius: 8px;
	color: #FFFFFF;
	font-size: 14px;
	padding: 10px 15px;
	position: relative;
	transform: translateY(-8px);
}

.price-tag::after {
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