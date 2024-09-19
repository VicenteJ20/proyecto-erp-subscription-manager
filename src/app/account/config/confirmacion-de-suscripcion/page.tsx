'use client'

import { CardPaymentLayout } from "@/components/config/CardPaymentLayout"
import { HeaderStepAccount } from "@/components/config/Header"
import { saveData } from "@/utils/pyme/saveData"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { SaveDataProps } from  "@/utils/pyme/saveData"

const ConfirmacionDeSuscripcionPage = () => {

  const firstFetch = useRef(false)
  const params = useSearchParams()

  useEffect(() => {
    if (!firstFetch.current) {
      const manager = JSON.parse(localStorage.getItem('manager') || '{}')
      const company = JSON.parse(localStorage.getItem('company') || '{}')
      const logoUrl = JSON.parse(localStorage.getItem('logoUrl') || '{}')
      const theme = JSON.parse(localStorage.getItem('theme') || '{}')
      const subscription = JSON.parse(localStorage.getItem('subscription') || '{}')

      const paymentinfo = {
        collectionId: params.get('collection_id'),
        collectionStatus: params.get('collection_status'),
        paymentId: params.get('payment_id'),
        status: params.get('status'),
        externalReference: params.get('external_reference'),
        paymentType: params.get('payment_type'),
        merchantOrderId: params.get('merchant_order_id'),
        paymentMethodId: params.get('payment_method_id'),
        preferenceId: params.get('preference_id'),
        siteId: params.get('site_id'),
        processingMode: params.get('processing_mode'),
        merchantAccountId: params.get('merchant_account_id'),
        companyId: company.id
      } as SaveDataProps['paymentinfo']

      saveData({ manager, company, logoUrl: logoUrl.url, theme, subscription, paymentinfo })

      firstFetch.current = true
    }
  }, [params])

  return (
    <section className='max-h-full h-[80vh] py-12 flex flex-col gap-6'>
      <HeaderStepAccount title='Confirmación de suscripción' description='A continuación encontrará un detalle de relativo a la información de su suscripción.' />
      <CardPaymentLayout />
    </section>
  )
}

export default ConfirmacionDeSuscripcionPage