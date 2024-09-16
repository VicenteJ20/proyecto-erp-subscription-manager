import { auth } from "@/auth";
import { SUBSCRIPTIONS } from "@/constants/SUBSCRIPTIONS";
import { PREFERENCEMPCLIENT } from "@/utils/mercadopago/client";
import { CreatePreApprovalPayload } from "mercadopago/models/preapproval/create-payload.model";
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

  const currentDate = new Date()

  const preference: CreatePreApprovalPayload = {
    payer_email: userEmail,
    auto_recurring: {
      frequency: paymentMode === 'monthly' ? 1 : 12,
      frequency_type: 'months',
      transaction_amount: validateSubscription.monthlyPrice,
      currency_id: 'CLP',
      start_date: new Date(currentDate.setDate(currentDate.getDate() + 14)).toISOString(),
    },
    back_url: 'https://1p6qr57p-3000.brs.devtunnels.ms/account/config/confirmar-suscripcion',
    reason: `Suscripción a plan ${subscriptionId} en modo ${paymentMode} por ${paymentMode === 'monthly' ? validateSubscription.monthlyPrice : validateSubscription.yearlyPrice} CLP en EPYME. Software de gestión empresarial para PYMES al alcance de tu mano.`
  }

  try {
    const res = await PREFERENCEMPCLIENT.create({ body: preference })
    return NextResponse.json({ preference: res }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
})

export const GET = auth(async (req, res) => {
  try {
    const res = await PREFERENCEMPCLIENT.search()

    return NextResponse.json({ plan: res }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
})