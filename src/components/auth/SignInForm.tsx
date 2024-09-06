'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z, infer as zInfer } from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";


const formSchema = z.object({
  email: z.string().email({ message: 'La dirección de correo electrónico no es válida' }),
})

export function SignInForm() {

  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(values: zInfer<typeof formSchema>) {
    console.log(values)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField control={form.control} name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder='Ej: su.correo@dominio.com' {...field} className='bg-white mx-0' />
              </FormControl>
              <FormDescription>
                Ingrese su correo para acceder con un enlace mágico
              </FormDescription>
            </FormItem>
          )} />
          <Button type='submit' className='p-5 text-base font-medium bg-blue-500 hover:bg-blue-700'>Enviar enlace</Button>
      </form>
    </Form>
  )
}