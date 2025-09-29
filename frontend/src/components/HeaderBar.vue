<script setup lang="ts">
import { Firebase } from '@/firebase';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonButton } from '@ionic/vue';
import { exitOutline } from 'ionicons/icons';
defineProps({
	name: String,
});
</script>

<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{ name }}</ion-title>
		</ion-toolbar>
	</ion-header>
</template>