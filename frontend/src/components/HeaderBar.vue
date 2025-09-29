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
			<ion-button v-if="Firebase.user.value" fill="clear" @click="Firebase.logOut()">
				<ion-icon slot="icon-only" :icon="exitOutline"></ion-icon>
			</ion-button>
		</ion-toolbar>
	</ion-header>
</template>