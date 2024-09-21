'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z, infer as zInfer } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setCompany, setManager } from "@/redux/features/account/accountSlice";
import { useRouter } from "next/navigation";
import { increment } from "@/redux/features/account/stageSlice";
import { useEffect, useState } from "react";
import { CheckExistence } from "@/utils/validations/existence";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";


const formSchema = z.object({
  email: z.string().email({ message: 'La dirección de correo electrónico no es válida' }),
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  phone: z.string().min(11, { message: 'El teléfono debe tener al menos 11 caracteres' }),
  address: z.string().min(3, { message: 'La dirección debe tener al menos 3 caracteres' }),
  city: z.string().min(3, { message: 'La ciudad debe tener al menos 3 caracteres' }),
  country: z.string().min(3, { message: 'El país debe tener al menos 3 caracteres' }),
  postalCode: z.string().min(3, { message: 'El código postal debe tener al menos 3 caracteres' }),
  website: z.string().min(3, { message: 'El sitio web debe tener al menos 3 caracteres' }),
  domain: z.string().min(3, { message: 'El dominio debe tener al menos 3 caracteres' })
})

export function PymeForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const readManager = JSON.parse(localStorage.getItem('manager') || '{}');
  const [checkState, setCheckState] = useState() as any
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const storedValues = JSON.parse(localStorage.getItem('company') || '{}');
  const defaultValues = {
    email: storedValues.email || '',
    name: storedValues.name || '',
    phone: storedValues.phone || '',
    address: storedValues.address || '',
    city: storedValues.city || '',
    country: storedValues.country || '',
    postalCode: storedValues.postalCode || '',
    website: storedValues.website || '',
    domain: storedValues.domain || ''
  };

  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: zInfer<typeof formSchema>) {

    // check if the company exists first
    const checkCompany = await CheckExistence(values.name, values.email, readManager.email)

    if (checkCompany?.status === 400) {
      setCheckState({
        title: '¡Algo salió mal!',
        message: checkCompany.message
      })
      setIsAlertDialogOpen(true)
      return
    }

    dispatch(setCompany({
      email: values.email,
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      website: values.website,
      domain: values.domain
    }))

    if (values.email !== '' && values.name !== '' && values.phone !== '' && values.address !== '' && values.city !== '' && values.country !== '' && values.postalCode !== '' && values.website !== '') {
      dispatch(increment())
      router.push('/account/config/personalizar-experiencia')
    }
  }

  const fields = [
    {
      name: 'name',
      label: 'Nombre de la empresa',
      placeholder: 'Ej: EPYME',
    },
    {
      name: 'email',
      label: 'Correo electrónico de la empresa',
      placeholder: 'Ej: epyme@epyme.app',
    },
    {
      name: 'phone',
      label: 'Número de teléfono',
      placeholder: 'Ej: 569123456',
    },
    {
      name: 'address',
      label: 'Dirección',
      placeholder: 'Ej: Av. Providencia 1234',
    },
    {
      name: 'city',
      label: 'Ciudad',
      placeholder: 'Ej: Santiago',
    },
    {
      name: 'country',
      label: 'País',
      placeholder: 'Ej: Chile',
    },
    {
      name: 'postalCode',
      label: 'Código postal',
      placeholder: 'Ej: 123456',
    },
    {
      name: 'website',
      label: 'Sitio web',
      placeholder: 'Ej: https://www.epyme.app',
    },
    {
      name: 'domain',
      label: 'Dominio',
      placeholder: 'Ej: epyme.app',
    }
  ]

  const defaultDomain = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN as string

  useEffect(() => {
    const name = form.watch('name')
    const domain = name.toLowerCase().replace(/\s/g, '')
    form.setValue('domain', `${domain}.${defaultDomain}`)
  }, [form.watch('name')])

  return (
    <>
      <Form {...form}>
        <form id='pymeForm' onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-2 gap-4 h-full'>
          {
            fields && fields.length > 0 && fields.map((item: any, index) => (
              <FormField control={form.control} name={item.name} key={index}
                render={({ field }) => (
                  <FormItem className={`${item.name === 'domain' ? 'col-span-2' : 'col-span-1'}`}>
                    <FormLabel className='font-medium'>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} className={`bg-white mx-0 rounded-sm`} disabled={item.name === 'domain'} />
                    </FormControl>
                  </FormItem>
                )} />
            ))
          }
        </form>
      </Form>
      {
        checkState && (
          <AlertDialog open={isAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{checkState.title}</AlertDialogTitle>
                <AlertDialogDescription>{checkState.message}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsAlertDialogOpen(!isAlertDialogOpen)}>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    </>
  )
}