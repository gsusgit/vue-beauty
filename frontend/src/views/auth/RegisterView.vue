<script setup>
import { FormKit } from '@formkit/vue'
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

const createAccount = async data => {
  const { password_confirm, ...userData } = data
  try {
    console.log(userData)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="mt-10">
    <h1 class="text-3xl font-semibold text-white mt-10 text-center">Crear cuenta</h1>
    <p class="text-white text-lg mt-5 text-center">Rellena el siguiente formulario para crear tu cuenta de usuario</p>
    <div class="mt-10">
      <FormKit
          type="form"
          submit-label="Crear cuenta"
          incomplete-message="No se pudo enviar, revisa los errores"
          @submit="createAccount"
          :value="formData"
      >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nombre"
            validation="required|length:3"
            v-model.trim="formData.name"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            validation="required|email"
            v-model.trim="formData.email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'El email no tiene un formato correcto'
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
        <FormKit
            type="password"
            label="Confirmar contraseña"
            name="password_confirm"
            placeholder="Contraseña"
            validation="required|confirm"
            :validation-messages="{
                required: 'Confirma tu contraseña',
                confirm: 'Las contraseñas no coinciden'
            }"
        />
      </FormKit>
    </div>
  </div>
</template>
