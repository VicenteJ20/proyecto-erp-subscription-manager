import { auth } from "@/auth";
import { SUBSCRIPTIONS } from "@/constants/SUBSCRIPTIONS";
import { FIRSTPAYMENTPLAN } from "@/utils/mercadopago/client";
import { CreatePreApprovalPayload } from "mercadopago/models/preapproval/create-payload.model";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { NextResponse } from "next/server";


export const POST = auth(async (req, res) => {
  const body = await req.json()

  const subscriptionId = body.subscriptionId
  const userEmail = body.userEmail
  const paymentMode = body.paymentMode

  const validateSubscription = SUBSCRIPTIONS.find(sub => sub.type === subscriptionId)

  if (!validateSubscription) {
    return NextResponse.json({ error: 'Subscripción enviada no encontrada' }, { status: 404 })
  }

  // const currentDate = new Date()

  // const preference: CreatePreApprovalPayload = {
  //   payer_email: userEmail,
  //   auto_recurring: {
  //     frequency: paymentMode === 'monthly' ? 1 : 12,
  //     frequency_type: 'months',
  //     transaction_amount: validateSubscription.monthlyPrice,
  //     currency_id: 'CLP',
  //     start_date: currentDate.toISOString(),
  //   },
  //   back_url: process.env.BACK_URL_PREFERENCE as string,
  //   reason: `Suscripción a plan ${subscriptionId} en modo ${paymentMode} por ${paymentMode === 'monthly' ? validateSubscription.monthlyPrice : validateSubscription.yearlyPrice} CLP en EPYME. Software de gestión empresarial para PYMES al alcance de tu mano.`
  // }

  // try {
  //   const res = await CLIENTSUSCRIPTION.create({ body: preference, requestOptions: {
  //     idempotencyKey: 'suscription-preference',
  //     timeout: 10000
  //   } })
  //   return NextResponse.json({ preference: res.id }, { status: 200 })
  // } catch (err: any) {
  //   console.log(err)
  //   console.log(err.message)
  //   return NextResponse.json({ error: err.message }, { status: 500 })
  // }

  const discountTier = validateSubscription.monthlyPrice * 0.1
  
  const preference = {
    items: [
      {
        id: `EPYME-${subscriptionId}-TRIAL-${validateSubscription.type}`,
        title: `Suscripción ${subscriptionId} de prueba por ${discountTier} CLP`,
        description:  `Gracias por interesarte en EPYME, durante tus primeros 30 días, pagarás solo el 10% (referente al valor mensual) de tu suscripción seleccionada. ¡Bienvenido!`,
        unit_price: discountTier,
        category_id: 'EPYME Software Trial',
        quantity: 1
      }
    ],
    back_urls: {
      success: process.env.BACK_URL_PREFERENCE as string,
      failure: process.env.BACK_URL_PREFERENCE as string,
      pending: process.env.BACK_URL_PREFERENCE as string
    },
    auto_return: 'approved',
    payment_methods: {
      installments: 12,
      default_installments: 1,
    },
    notification_url: process.env.WEBHOOK_PREFERENCE as string,
  }

  try {
    const res = await FIRSTPAYMENTPLAN.create({ body: preference})
    return NextResponse.json({ preference: res.id }, { status: 200 })
  } catch (err: any) {
    console.log(err)
    console.log(err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
})
