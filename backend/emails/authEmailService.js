import { createTransport } from "../config/nodemailer.js"

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        process.env.MAILTRAP_SMTP_HOST,
        process.env.MAILTRAP_SMTP_PORT,
        process.env.MAILTRAP_SMTP_AUTH_USER,
        process.env.MAILTRAP_SMTP_AUTH_PASSWORD
    )
    const info = await transporter.sendMail({
        from: "Vue Beauty",
        to: email,
        subject: "Vue Beauty - Verificación de usuario",
        html: `<h3 style="font-size:1.4rem;line-height:1.8rem;font-weight:normal;font-family:Arial,sans-serif;">Hola, <b>${name}</b></h3>
               <p style="font-family:Arial,sans-serif;">Bienvenido a Vue Beauty.</p>
               <p style="font-family:Arial,sans-serif;">Confirma tu cuenta de usuario haciendo clic en el <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">siguiente enlace</a></p>
               <p style="font-family:Arial,sans-serif;">Una vez verificada tu cuenta, podrás comenzar a usar el servicio. Si no creaste la cuenta, ignora este mensaje.</p>
               <h1 style="font-family:Arial,sans-serif;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="28" alt="Vue Logo"><span style="font-size:2rem;line-height:2.3rem;margin-left:3px;">ue Beauty</span></h1></a>`
    })
    console.log('Mensaje de verificación de cuenta enviado', info.messageId)
}

export async function sendEmailUserVerified({name, email}) {
    const transporter = createTransport(
        process.env.MAILTRAP_SMTP_HOST,
        process.env.MAILTRAP_SMTP_PORT,
        process.env.MAILTRAP_SMTP_AUTH_USER,
        process.env.MAILTRAP_SMTP_AUTH_PASSWORD
    )
    const info = await transporter.sendMail({
        from: "Vue Beauty",
        to: email,
        subject: "Vue Beauty - Usuario verificado correctamente",
        html: `<h3 style="font-size:1.4rem;line-height:1.8rem;font-weight:normal;font-family:Arial,sans-serif;">Hola, <b>${name}</b></h3>
               <p style="font-family:Arial,sans-serif;">Bienvenido a Vue Beauty.</p>
               <p style="font-family:Arial,sans-serif;">Le confirmamos que su cuenta de usuario ha sido verificada correctamente. A continuación puede iniciar sesión en la <a href="${process.env.FRONTEND_URL}/login">siguiente dirección</a></p>
               <h1 style="font-family:Arial,sans-serif;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="28" alt="Vue Logo"><span style="font-size:2rem;line-height:2.3rem;margin-left:3px;">ue Beauty</span></h1></a>`
    })
    console.log('Mensaje de cuenta verificada enviado', info.messageId)
}
