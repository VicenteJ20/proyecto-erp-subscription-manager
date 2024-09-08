import { HeaderStepAccount } from "@/components/config/Header"
import { ManagerForm } from "@/components/config/ManagerForm"
import { auth } from "@/auth"

const ConfigurationPage = async () => {
  const session = await auth()
  return (
    <section className='max-h-full py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Información personal' description='Te damos la bienvenida a EPYME, necesitamos más información para continuar con la configuración de su cuenta.' />
      <ManagerForm email={session?.user?.email || '' }/>
    </section>
  )
}

export default ConfigurationPage