<script setup>
    import { inject} from 'vue'
    import { reset} from '@formkit/core'
    import AuthAPI from '../../api/AuthAPI'

    const toast = inject('toast')

    const handleSubmit = async ({email}) => {
        try {
            const {data } = await AuthAPI.forgotPassword({email})
            toast.open({
                message: data.msg,
                type: 'success'
           })
           reset('forgotPassword')
        } catch (error) {
           toast.open({
                message: error.response.data.msg,
                type: 'error'
           })
        }
    }
</script>

<template>
    <h1 class="text-3xl font-extrabold text-white text-center mt-10">Olvide mi contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Escribe tu correo para recuperar tus claves de acceso</p>
    <FormKit
        id="forgotPassword"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa los errores"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no válido'
            }"
        />

        <FormKit type="submit">Enviar</FormKit>

    </FormKit>
</template>

