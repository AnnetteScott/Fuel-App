import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/map'
	},
	{
		path: '/',
		component: TabsPage,
		children: [
			{
				path: 'home',
				name: 'Landing',
				component: () => import('@/views/HomePage.vue')
			},
			{
				path: 'map',
				component: () => import('@/views/MapPage.vue')
			},
			{
				path: 'profile',
				component: () => import('@/views/ProfilePage.vue')
			},
		]
	},
	{
		path: '/login',
		name: "Login",
		component: () => import('@/views/LoginPage.vue')
	}
]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
})

export default router
