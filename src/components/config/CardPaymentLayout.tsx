'use client'

import { useSearchParams } from "next/navigation"
import { CardPymentInfo } from "./CardPaymentInfo"

const CardPaymentLayout = () => {

  const params = useSearchParams()
  const transactionData = {
    status: params.get('collection_status'),
    payment_id: params.get('payment_id'),
    payment_type: params.get('payment_type'),
    merchant_order_id: params.get('merchant_order_id'),
    site_id: params.get('site_id')
  }

  return (
    <section className='min-h-full  flex items-center justify-center'>
      <CardPymentInfo transactionData={transactionData} />
    </section>
  )
}

export { CardPaymentLayout }