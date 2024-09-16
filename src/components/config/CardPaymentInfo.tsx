'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiCheckboxCircleLine, RiCloseCircleLine, RiErrorWarningLine } from '@remixicon/react'
import { Button } from "../ui/button"


const CardPymentInfo = (tf: any) => {
  const { transactionData } = tf

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <RiCheckboxCircleLine className="h-20 w-20 text-green-500" />
      case 'rejected':
        return <RiCloseCircleLine className="h-20 w-20 text-red-500" />
      default:
        return <RiErrorWarningLine className="h-20 w-20 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500'
      case 'rejected':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  return (
    <Card className="w-full max-w-2xl border border-zinc-200 shadow-none">
      <CardHeader className="flex flex-col items-center text-center pb-2">
        {getStatusIcon(transactionData.status)}
        <div className='flex flex-col gap-6'>
          <CardTitle className="text-2xl">{transactionData.status === 'approved' ? '¡Felicidades! has completado el pago con éxito' : transactionData.status === 'rejected' ? 'Oops, ha ocurrido un problema con el pago' : 'Oops, al parecer ha ocurrido un problema'}</CardTitle>
          <CardDescription>
            {
              transactionData.status === 'approved' ? 'Tu pago ha sido completado con éxito, En unos minutos recibirás un correo electrónico con los detalles de tu compra, e instrucciones para iniciar sesión y empezar a trabajar con EPYME. Gracias por confiar en nosotros.' : transactionData.status === 'rejected' ? 'Ha ocurrido un problema con tu pago, puedes intentarlo más tarde con otro medio de pago, o contactar con soporte técnico.' : 'Al parecer hubo un problema procesando tu pago, en unos minutos recibirás un correo con instrucciones de acceso a tu cuenta de EPYME. Si el pago no fue completado, no se harán cargos a tu cuenta. y podrás intentar nuevamente.' 
            }
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='mt-5'>
        {
          transactionData.status === 'approved' ? (
            <Button className="w-full bg-teal-600">Iniciar sesión</Button>
          ) : transactionData.status === 'rejected' ? (
            <Button className="w-full bg-red-600">Volver a intentar</Button>
          ) : (
            <Button className="w-full bg-zinc-800">Contactar con soporte</Button>
          )
        }
      </CardContent>
    </Card >
  )
}

export { CardPymentInfo }