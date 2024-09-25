import { createTransport} from '../config/nodemailer.js'

export async function sendEmailNewAppointment({date, time }) {
    const transporter = createTransport(
        process.env.MAILTRAP_SMTP_HOST,
        process.env.MAILTRAP_SMTP_PORT,
        process.env.MAILTRAP_SMTP_AUTH_USER,
        process.env.MAILTRAP_SMTP_AUTH_PASSWORD
    )
    const info = await transporter.sendMail({
        from: 'Vue Beauty',
        to: 'admin@vuebeauty.com',
        subject: "Vue Beauty - Nueva Cita",
        html: `<h3 style="font-size:1.4rem;line-height:1.8rem;font-weight:normal;font-family:Arial,sans-serif;">Hola,</b></h3>
               <p style="font-family:Arial,sans-serif;">Un usuario añadió una nueva cita.</p>
               <p style="font-family:Arial,sans-serif;">Detalles: ${date} a las ${time}.</p>
               <h1 style="font-family:Arial,sans-serif;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="28" alt="Vue Logo"><span style="font-size:2rem;line-height:2.3rem;margin-left:3px;">ue Beauty</span></h1></a>`
    })
    console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailUpdateAppointment({date, time }) {
    const transporter = createTransport(
        process.env.MAILTRAP_SMTP_HOST,
        process.env.MAILTRAP_SMTP_PORT,
        process.env.MAILTRAP_SMTP_AUTH_USER,
        process.env.MAILTRAP_SMTP_AUTH_PASSWORD
    )
    const info = await transporter.sendMail({
        from: 'Vue Beauty',
        to: 'admin@vuebeauty.com',
        subject: "Vue Beauty - Actualización Cita",
        html: `<h3 style="font-size:1.4rem;line-height:1.8rem;font-weight:normal;font-family:Arial,sans-serif;">Hola,</b></h3>
               <p style="font-family:Arial,sans-serif;">Un usuario ha actualizado una cita.</p>
               <p style="font-family:Arial,sans-serif;">La cita se actualizó al ${date} a las ${time}.</p>
               <h1 style="font-family:Arial,sans-serif;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="28" alt="Vue Logo"><span style="font-size:2rem;line-height:2.3rem;margin-left:3px;">ue Beauty</span></h1></a>`
    })

    console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailCancelledAppointment({date, time }) {
    const transporter = createTransport(
        process.env.MAILTRAP_SMTP_HOST,
        process.env.MAILTRAP_SMTP_PORT,
        process.env.MAILTRAP_SMTP_AUTH_USER,
        process.env.MAILTRAP_SMTP_AUTH_PASSWORD
    )
    const info = await transporter.sendMail({
        from: 'Vue Beauty',
        to: 'admin@vuebeauty.com',
        subject: "Vue Beauty - Cita Cancelada",
        html: `<h3 style="font-size:1.4rem;line-height:1.8rem;font-weight:normal;font-family:Arial,sans-serif;">Hola,</b></h3>
               <p style="font-family:Arial,sans-serif;">Un usuario ha cancelado una cita.</p>
               <p style="font-family:Arial,sans-serif;">Detalles: ${date} a las ${time}.</p>
               <h1 style="font-family:Arial,sans-serif;"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width="28" alt="Vue Logo"><span style="font-size:2rem;line-height:2.3rem;margin-left:3px;">ue Beauty</span></h1></a>`
    })
    console.log('Mensaje enviado', info.messageId)
}
