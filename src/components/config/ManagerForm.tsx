'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z, infer as zInfer } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setManager } from "@/redux/features/account/accountSlice";
import { useRouter } from "next/navigation";
import { increment } from "@/redux/features/account/stageSlice";


const formSchema = z.object({
  email: z.string().email({ message: 'La dirección de correo electrónico no es válida' }),
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  phone: z.string().min(11, { message: 'El teléfono debe tener al menos 11 caracteres' }),
})

export function ManagerForm({ email }: { email?: string }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const storedValues = JSON.parse(localStorage.getItem('manager') || '{}');
  const defaultValues = {
    email: storedValues.email || email || '',
    name: storedValues.name || '',
    phone: storedValues.phone || ''
  };


  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });


  async function onSubmit(values: zInfer<typeof formSchema>) {
    dispatch(setManager({
      email: values.email,
      name: values.name,
      phone: values.phone
    }))

    if (values.email !== '' && values.name !== '' && values.phone !== '') {
      dispatch(increment())
      router.push('/account/config/info-pyme')
    }
  }

  const fields = [
    {
      name: 'name' as 'email' | 'name' | 'phone',
      label: 'Nombre completo',
      placeholder: 'Ej: Juan José Doe Doe',
      message: 'Debe ingresar su nombre completo'
    },
    {
      name: 'phone' as 'email' | 'name' | 'phone',
      label: 'Número de teléfono',
      placeholder: 'Ej: 569123456',
      message: 'Debe ingresar su número de teléfono con código de área sin el +.'
    }
  ]

  return (
    <>
      <Form {...form}>
        <form id='managerForm' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
          {
            fields && fields.length > 0 && fields.map((item, index) => (
              <FormField control={form.control} name={item.name} key={index}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium'>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} className='bg-white mx-0 rounded-sm ' />
                    </FormControl>
                  </FormItem>
                )} />
            ))
          }
        </form>
      </Form>
    </>
  )
}