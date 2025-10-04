<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { GoogleMap } from '@/MapManager';


export default defineComponent({
	name: 'MapPage',
	data() {
		return {
		};
	},
	async mounted() {
		const mapEl = document.getElementById("map");
		console.log(navigator.geolocation)
		GoogleMap.initMap(mapEl);
	},
	methods: {
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

.current_location {
	background-color: #4285F4;
    border-radius: 50px;
    font-size: 14px;
    padding: 8px;
    position: relative;
    border: 2px solid white;
}
</style>