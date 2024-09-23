<script setup>
import {  useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="mb-10">
    <h2 class="text-4xl font-extrabold text-white mt-10">{{route.params.title}}</h2>
    <p class="text-white text-lg mt-5">{{route.params.text}}</p>
  </div>
</template>
