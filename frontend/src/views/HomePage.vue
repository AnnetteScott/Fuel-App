<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<template>
	<ion-page>
		<HeaderBar name="Home" />
		<ion-content :fullscreen="true">
		</ion-content>
	</ion-page>
</template>
