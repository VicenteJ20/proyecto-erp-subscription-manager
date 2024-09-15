import { HeaderStepAccount } from "@/components/config/Header"
import SubscriptionSelector from "@/components/config/SubscriptionsSelector"


const SeleccionaSuscripcionPage = () => {
  return (
    <section className='max-h-full py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Seleccionar suscripción' description='Seleccione la suscripción que mejor satisfaga sus necesidades empresariales. (Puede cambiar de suscripción en cualquier momento)' />
      <SubscriptionSelector />
    </section>
  )
}

export default SeleccionaSuscripcionPage