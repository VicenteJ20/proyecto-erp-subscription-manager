'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { RiBankCard2Line } from '@remixicon/react'
import { SUBSCRIPTIONS } from '@/constants/SUBSCRIPTIONS'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useSelector } from 'react-redux'


export default function SubscriptionSelector() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('') as any
  const [preferenceId, setPreferenceId] = useState('') as any
  const triggerRef = useRef(null) as any
  const company = useSelector((state: any) => state.account.company)
  const manager = useSelector((state: any) => state.account.manager)

  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string, {
    locale: 'es-CL',
  })

  console.log(preferenceId)
  const handleOpenDialog = () => {
    if (triggerRef.current) {
      triggerRef.current.click()
    }
  }

  const handleSubscriptionSelector = (sub: any) => {
    handleOpenDialog()
    setSelectedPlan(sub.type)
  }

  const handlePreference = async (plan: string) => {
    const sub = SUBSCRIPTIONS.find(sub => sub.type === plan)

    if (!sub) return

    try {
      const res = await fetch('/api/suscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: sub.type,
          userEmail: 'vicente@gmail.cl' || company.email || manager.email,
          paymentMode: isYearly ? 'yearly' : 'monthly'
        })
      })

      const data = await res.json()
      const { preference } = data
      if (preference) setPreferenceId(preference)
      console.log(data)
      return preference
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center mb-8 space-x-2">
          <span className="text-sm font-medium">Mensual</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className="text-sm font-medium">Anual</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTIONS.map((sub, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{sub.type}</CardTitle>
                <CardDescription>
                  {isYearly ? `${sub.yearlyPrice.toFixed(3)} CLP/año` : `${sub.monthlyPrice.toFixed(3)} CLP/mes`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-sm">
                <ul className="list-disc list-inside space-y-2">
                  {sub.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='flex flex-col gap-3'>
                <Button onClick={() => handleSubscriptionSelector(sub)} className="w-full bg-teal-600 border border-teal-800 hover:text-zinc-100">
                  <RiBankCard2Line className='mr-1.5 w-4' /> Ir a pagar</Button>
                <Link href='https://epyme.app/pricing/' rel='noreferrer' className="w-full text-center underline underline-offset-4 text-zinc-600 text-sm">Más información</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger ref={triggerRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Haz seleccionado el Plan {selectedPlan}</AlertDialogTitle>
            <AlertDialogDescription>
              {
                selectedPlan !== '' && (
                  <>
                    El plan seleccionado <strong>{selectedPlan}</strong> tiene un precio de {isYearly ? 'anual' : 'mensual'} de {SUBSCRIPTIONS.find(sub => sub.type === selectedPlan)![isYearly ? 'yearlyPrice' : 'monthlyPrice']} CLP que serán cargados a tu cuenta de manera {isYearly ? 'anual' : 'mensual'} una vez finalice la prueba gratuita. Serás redirigido a la pasarela de pagos de mercado pago para completar la transcacción. ¿Deseas continuar?
                  </>
                )
              }
            </AlertDialogDescription>
            {
              preferenceId && preferenceId !== '' && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )
            }
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-col'>
            <AlertDialogCancel>
              {preferenceId ? 'Cancelar operación' : 'No, cancelar'}
            </AlertDialogCancel>
            {
              !preferenceId && (
                <Button onClick={() => handlePreference(selectedPlan)} className='bg-teal-600'>Sí, continuar</Button>
              )
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}