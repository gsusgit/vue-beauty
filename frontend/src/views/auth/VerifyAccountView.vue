<script setup>
import { useRoute } from 'vue-router'
import authAPI from '@/api/authAPI.js'
import { onMounted, inject } from 'vue'

const route = useRoute()
const toast = inject('toast')

onMounted(async () => {
  const {token} = route.params
  try {
    const {data} = await authAPI.verify(token)
    toast.open({
      message: data.msg,
      type: 'success'
    })
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
})
</script>

<template>
  <div class="mb-10 text-center">
    <h2 class="text-4xl font-extrabold text-white mt-10">Verificación de cuenta</h2>
  </div>
</template>
