'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z, infer as zInfer } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setEstimatedUsers, setTheme } from "@/redux/features/account/accountSlice";
import { useRouter } from "next/navigation";
import { increment } from "@/redux/features/account/stageSlice";
import SimpleColorSelector from "./ColorPicker";
import FileUpload from "./FileUpload";


const formSchema = z.object({
  estimatedUsers: z.string({ message: 'Debe ingresar la cantidad de colaboradores estimados' }),
})

export function ExperiencePymeForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useSelector((state: any) => state.account.theme)
  const company = useSelector((state: any) => state.account.company)

  const storedValues = JSON.parse(localStorage.getItem('theme') || '{}');
  const defaultValues = {
    estimatedUsers: storedValues.estimatedUsers || theme.estimatedUsers || '',
  };

  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: zInfer<typeof formSchema>) {
    dispatch(setEstimatedUsers(values.estimatedUsers.toString()))

    if (theme.mainColor !== '' && company.logo !== '' && theme.estimatedUsers !== '') {
      dispatch(increment())
      router.push('/account/config/seleccionar-suscripcion')
    }
  }

  const fields = [
    {
      name: 'mainColor',
      label: 'Color primario de su marca o PYME',
      placeholder: 'Ej: #FFFFFF',
    },
    {
      name: 'file',
      label: 'Logo de su empresa',
      placeholder: 'Ej: https://www.example.com/logo.png',
      type: 'file',
    },
    {
      name: 'estimatedUsers',
      label: 'Cantidad de colaboradores estimados',
      placeholder: 'Ej: 10',
      type: 'text',
    }
  ]


  return (
    <>
      <Form {...form}>
        <form id='experienceForm' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 h-full'>
          {
            fields && fields.length > 0 && fields.map((item: any, index) => (
              <FormField control={form.control} name={item.name} key={index}
                render={({ field }): any => {
                  if (field.name === 'mainColor') {
                    return (
                      <FormItem>
                        <SimpleColorSelector />
                      </FormItem>
                    )
                  } else if (field.name === 'file') {
                    return (
                      <FormItem>
                        <FileUpload label={item.label} />
                      </FormItem>
                    );
                  } else {
                    return (
                      <FormItem>
                        <FormLabel className='font-medium'>{item.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.placeholder} {...field} className='bg-white mx-0 rounded-sm ' />
                        </FormControl>
                      </FormItem>
                    )
                  }
                }} />
            ))
          }
        </form>
      </Form>
    </>
  )
}