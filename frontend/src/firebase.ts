import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, collection, onSnapshot, arrayUnion, updateDoc, setDoc, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword   } from "firebase/auth";
import { Ref, ref } from "vue";
import router from '@/router'
import { StationData, VehicleData } from "./types";

const firebaseConfig = {
	apiKey: "AIzaSyATTTBVQxVGV7VXr4j0DexThQmzchuUlCM",
	authDomain: "fuel-app-ad41d.firebaseapp.com",
	projectId: "fuel-app-ad41d",
	storageBucket: "fuel-app-ad41d.firebasestorage.app",
	messagingSenderId: "478517563694",
	appId: "1:478517563694:web:1681db21762a9b1ad9aabf"
};

export class Firebase {
	private static app = initializeApp(firebaseConfig);
	private static db = getFirestore(this.app);
	private static auth = getAuth(this.app);

	public static user = ref(null) as Ref<User | null>;
	public static userData = ref({}) as Ref<VehicleData>;
	public static stations = ref([]) as Ref<StationData[]>;


	private static authUnsubscribe = onAuthStateChanged(this.auth, (user) => {
		this.user.value = user;
		if (!this.user.value) {
			router.push({name: 'Login'});
		}

		this.getData();
	});

	public static async login(email: string, password: string): Promise<boolean> {
		if(!email || !password) {
			return false;
		}

		try {
			const result = await signInWithEmailAndPassword(this.auth, email, password);
			if(result.user.email == this.user.value?.email){
				router.push({name: 'Home'});
				return true;
			}
		} catch (error) {
			return false;
		}
		return false;
	}

	public static logOut() {
		this.auth.signOut();
	}

	private static async getData() {
		if(!this.user.value){
			return;
		}

		const stationRef = doc(this.db, "data", "stations");
		const docSnapStation = await getDoc(stationRef);
		if (docSnapStation.exists()) {
			const data = docSnapStation.data() as {stations: StationData[]};
			this.stations.value = data.stations;
		}

		const userRef = doc(this.db, "data", this.user.value.uid);
		const docSnap = await getDoc(userRef);
		if (docSnap.exists()) {
			const data = docSnap.data() as VehicleData;
			this.userData.value = data;
			
		}

		console.log(this.stations.value, this.userData.value)

		const stations = {stations: [
			{
				'name': "Caltex Western Springs", 
				'fuel': {
					"91": 2.609
				},
				'pos': {lat: -36.86810, lng: 174.72849}
			},
			{
				'name': "Mobil", 
				'fuel': {
					"91": 2.598
				},
				'pos': {lat: -36.86972, lng: 174.71151}
			},
			{
				'name': "Costco", 
				'fuel': {
					"91": 2.459
				},
				'pos': {lat: -36.81109, lng: 174.60611}
			},
			{
				'name': "Gull Rosebank East", 
				'fuel': {
					"91": 2.589
				},
				'pos': {lat: -36.87413, lng: 174.67010}
			},
			{
				'name': "Z Greenlane", 
				'fuel': {
					"91": 2.579
				},
				'pos': {lat: -36.88997, lng: 174.79586}
			},
			{
				'name': "U-GO Mt Albert", 
				'fuel': {
					"91": 2.579
				},
				'pos': {lat: -36.88046, lng: 174.72512}
			},
		]} as {stations: StationData[]}


		/* await setDoc(doc(this.db, "data/stations"), {
			...JSON.parse(JSON.stringify(stations))
		}); */
	}
}