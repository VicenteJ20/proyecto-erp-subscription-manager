import { MercadoPagoConfig, PreApproval, PreApprovalPlan } from 'mercadopago'

const MPCLIENT = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
  options: {
    timeout: 10000
  },
})

const PREFERENCEMPCLIENT = new PreApprovalPlan(MPCLIENT)

export { PREFERENCEMPCLIENT }