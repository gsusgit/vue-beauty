<script setup>
    import { onMounted, inject, ref } from 'vue'
    import { useRoute, useRouter} from 'vue-router'
    import AuthAPI from '../../api/AuthAPI';
    
    const toast = inject('toast')
    const router = useRouter()
    const route = useRoute()
    const {token } = route.params

    const validToken = ref(false)
    
    onMounted(async () => {
        try {
            const {data} = await AuthAPI.verifyPasswordResetToken(token)
            validToken.value = true
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })

    const handleSubmit = async ({password}) => {
        try {
            const { data } = await AuthAPI.updatePassword(token, {password})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({name: 'login'})
            }, 3000);
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    } 
</script>


<template>
    <div v-if="validToken">
        <h1 class="text-3xl font-extrabold text-white text-center mt-10">Restablece tu cuenta</h1>
        <p class="text-2xl text-white text-center my-5">Escribe una contraseña nueva</p>

        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa los errores"
            @submit="handleSubmit"
        >

            <FormKit
                type="password"
                label="Contraseña"
                name="password"
                placeholder="Contraseña (Mínimo 8 caracteres)"
                validation="required|length:8"
                :validation-messages="{
                    required: 'La contraseña es obligatoria',
                    length: 'La contraseña debe tener 8 caracteres como mínimo'
                }"
            />

            <FormKit type="submit">Crear contraseña</FormKit>

        </FormKit>
    </div>

    <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
</template>


