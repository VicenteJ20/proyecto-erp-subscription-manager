'use server'

import { signIn } from "@/auth"

export async function SignIn({ email }: { email: string }) {
  try {
    await signIn("resend", {email, redirect: false})
    return { message: 'Se ha enviado un enlace mágico a su correo electrónico', status: 200 }
  } catch (error) {
    console.error(error)
    return { message: 'Ha ocurrido un error al enviar el enlace mágico', status: 500 }
  }
}