import { CardPaymentLayout } from "@/components/config/CardPaymentLayout"
import { HeaderStepAccount } from "@/components/config/Header"

const ConfirmacionDeSuscripcionPage = () => {
  return (
    <section className='max-h-full h-[80vh] py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Confirmación de suscripción' description='A continuación encontrará un detalle de relativo a la información de su suscripción.' />
      <CardPaymentLayout />
    </section>
  )
}

export default ConfirmacionDeSuscripcionPage