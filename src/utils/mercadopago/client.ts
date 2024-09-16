import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const MPCLIENT = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
  options: {
    timeout: 10000
  },
})

const FIRSTPAYMENTPLAN = new Preference(MPCLIENT)
const PAYMENTCLIENT = new Payment(MPCLIENT)
export { FIRSTPAYMENTPLAN, PAYMENTCLIENT }