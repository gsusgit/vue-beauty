<script setup>
import { FormKit } from '@formkit/vue'
</script>

<template>
  <div class="mt-10 text-center">
    <h1 class="text-3xl font-semibold text-white mt-10">Iniciar sesión</h1>
    <p class="text-white text-lg mt-5">Introduce tus credenciales de acceso</p>
    <div class="mt-10">
      <FormKit
          type="form"
      >
        <FormKit
            type="text"
        />
      </FormKit>
    </div>
  </div>
</template>
