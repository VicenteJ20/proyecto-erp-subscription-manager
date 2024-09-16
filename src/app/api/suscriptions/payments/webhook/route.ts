import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const body = await req.json()
  try {
    const apiEndpoint = process.env.DEFAULT_API_ENDPOINT_ML as string

    const paymentInfo = await fetch(`${apiEndpoint}${body.data.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const paymentData = await paymentInfo.json()

    return NextResponse.json({ paymentData }, { status: 200 })
  } catch (err: any) {
    console.log(err)
    console.log(err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}