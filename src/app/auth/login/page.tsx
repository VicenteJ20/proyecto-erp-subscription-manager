import { AuthHeader } from "@/components/auth/Header"
import { SignInForm } from "@/components/auth/SignInForm"
import { SocialLogin } from "@/components/auth/SocialLogin"
import AuthLayout from "@/layouts/auth/AuthLayout"

const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthHeader title="Bienvenido a EPYME" description='Inicie sesión o registrese para acceder al servicio.' />
      <div className='px-8 max-w-full'>
        <SignInForm />
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <SocialLogin />
      </div>
    </AuthLayout>
  )
}

export default LoginPage