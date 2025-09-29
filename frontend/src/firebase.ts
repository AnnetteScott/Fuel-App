import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword   } from "firebase/auth";
import { Ref, ref } from "vue";
import router from '@/router'

const firebaseConfig = {
	apiKey: "AIzaSyATTTBVQxVGV7VXr4j0DexThQmzchuUlCM",
	authDomain: "fuel-app-ad41d.firebaseapp.com",
	projectId: "fuel-app-ad41d",
	storageBucket: "fuel-app-ad41d.firebasestorage.app",
	messagingSenderId: "478517563694",
	appId: "1:478517563694:web:1681db21762a9b1ad9aabf"
};

export class Firebase {
	private static _instance: Firebase;

	private static app = initializeApp(firebaseConfig);
	private static db = getFirestore(this.app);
	private static auth = getAuth(this.app);

	public static user = ref(null) as Ref<User | null>;

	private static authUnsubscribe = onAuthStateChanged(this.auth, (user) => {
		this.user.value = user;
		if (this.user.value) {
			router.push({name: 'Landing'});
		} else {
			router.push({name: 'Login'});
			// User is signed out
		}
	});

	private constructor()
    {
        //...
    }

	public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

	public static login(email: string, password: string) {
		console.log(email)
		signInWithEmailAndPassword(this.auth, email, password)
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage)
		});
	}

	public static logOut() {
		this.auth.signOut();
	}
}