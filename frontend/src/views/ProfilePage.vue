<template>
<ion-page>
	<HeaderBar name="Page" />
	<ion-content :fullscreen="true">
	</ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
</script>
