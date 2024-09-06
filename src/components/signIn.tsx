import { signIn } from '@/auth'
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
      className='w-44 h-1 p-2'
    >
      <input className='text-sm text-black' type="text" name="email" placeholder="Email" />
      <button className='text-sm' type="submit">Signin with Resend</button>
    </form>
  )
}