<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonInputPasswordToggle, IonItem, IonButton  } from '@ionic/vue';
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
			console.log(this.email)
			Firebase.login(this.email, this.password)
		}
	},
})

</script>

<template>
<ion-page>
	<HeaderBar name="Login" />
	<ion-content :fullscreen="true">

		<ion-item>
			<ion-input label="Email" placeholder="me@example.com" v-model="email"></ion-input>
		</ion-item>

		<ion-item>
			<ion-input type="password" label="Password" v-model="password">
				<ion-input-password-toggle slot="end"></ion-input-password-toggle>
			</ion-input>
		</ion-item>
		<ion-button shape="round" @click="login()">Login</ion-button>
	</ion-content>
</ion-page>
</template>
