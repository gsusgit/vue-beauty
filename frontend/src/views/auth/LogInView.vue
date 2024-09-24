<script setup>
import { FormKit } from '@formkit/vue'
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import authAPI from '@/api/authAPI.js'

const formData = reactive({
  email: 'jesusfer80@gmail.com',
  password: '12345678'
})
const router = useRouter()
const toast = inject('toast')

const logIn = async (formData) => {
  try {
    const {data: {token}} = await authAPI.login(formData)
    localStorage.setItem('vuebeautytoken', token)
    await router.push({name: 'my-appointments'})
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="mt-10">
    <h1 class="text-3xl font-semibold text-white mt-10 text-center">Inicio de sesión</h1>
    <p class="text-white text-lg mt-5 text-center">Introduce tus credenciales para entrar al sistema</p>
    <div class="mt-10">
      <FormKit
          type="form"
          submit-label="Iniciar sesión"
          incomplete-message="No se pudo enviar, revisa los errores"
          @submit="logIn"
          :value="formData"
      >
        <FormKit
            type="text"
            label="Email"
            name="email"
            placeholder="Email"
            validation="required"
            v-model.trim="formData.email"
            :validation-messages="{
                required: 'El email es obligatorio'
            }"
        />
        <FormKit
            type="password"
            label="Contraseña"
            name="password"
            placeholder="Contraseña (Mínimo 8 caracteres)"
            validation="required|length:8"
            v-model.trim="formData.password"
            :validation-messages="{
                required: 'La contarseña es obligatoria',
                length: 'La contraseña ha de tener al menos 8 caracteres'
            }"
        />
      </FormKit>
    </div>
  </div>
</template>
