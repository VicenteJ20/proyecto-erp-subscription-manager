import { HeaderStepAccount } from "@/components/config/Header"
import { ExperiencePymeForm } from "@/components/config/PersonalizarExperienciaForm"


const PersonalizarExperienciaPage = () => {
  return (
    <section className='max-h-full py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Personalice su experiencia' description='Configure la información de experiencia de usuario de empresa para personalizar su experiencia.' />
      <ExperiencePymeForm  />
    </section>
  )
}

export default PersonalizarExperienciaPage