<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { Firebase } from '@/firebase';
export default defineComponent({
	name: 'LoginPage',
	data() {
		return {
			email: "",
			password: ""
		};
	},
	mounted() {
		
	},
	methods: {
		login() {
			Firebase.login(this.email, this.password)
		}
	},
})
</script>


<template>
	<ion-page>
		<HeaderBar name="Map" />
		<ion-content :fullscreen="true">
		</ion-content>
	</ion-page>
</template>