import { createRouter, createWebHistory } from 'vue-router'
import authAPI from '@/api/authAPI.js'
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'auth/login'
    },
    {
      path: '/reservas',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appointments/MyAppointmentsView.vue')
        },
        {
          path: 'nueva',
          component: () => import( '../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import( '../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import( '../views/appointments/AppointmentView.vue'),
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LogInView.vue')
        },
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'account-verification',
          component: () => import('../views/auth/VerifyAccountView.vue')
        }
      ]
    }
  ]
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    try {
      await authAPI.checkToken()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router
