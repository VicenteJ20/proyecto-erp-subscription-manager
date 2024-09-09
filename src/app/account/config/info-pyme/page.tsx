import { HeaderStepAccount } from "@/components/config/Header"
import { PymeForm } from "@/components/config/PymeForm"


const InfoPymePage = () => {
  return (
    <section className='max-h-full py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Información de la PYME' description='Registre la información solicitada sobre su empresa para completar el registro.' />
      <PymeForm />
      
    </section>
  )
}

export default InfoPymePage