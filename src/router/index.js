import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactApp from '../views/ContactApp.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactEdit from '../views/ContactEdit.vue'
import StatisticPage from '../views/StatisticPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/statistics',
      name: 'statistic',
      component: StatisticPage
    },
    {
      path: '/contact',
      component: ContactApp
    },
    {
      path: '/contact/:_id',
      component: ContactDetails,
    },
    {
      path: '/contact/edit/:_id?',
      component: ContactEdit,
    }
  ]
})

export default router
