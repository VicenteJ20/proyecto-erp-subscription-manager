'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z, infer as zInfer } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setTheme } from "@/redux/features/account/accountSlice";
import { useRouter } from "next/navigation";
import { increment } from "@/redux/features/account/stageSlice";
import SimpleColorSelector from "./ColorPicker";
import FileUpload from "./FileUpload";


const formSchema = z.object({
  mainColor: z.string({ message: 'Debe seleccionar el color primario de su marca o PYME.' }),
  fontFamily: z.string({ message: 'Debe seleccionar la fuente de su marca o PYME.' }),
  logo: z.string({ message: 'Debe cargar el logo de su empresa' }),
  estimatedUsers: z.number({ message: 'Debe ingresar la cantidad de colaboradores estimados que usarán el sistema.' }),
})

export function ExperiencePymeForm() {
  const dispatch = useDispatch()
  const router = useRouter()

  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainColor: '',
      fontFamily: '',
      logo: '',
    }
  })

  async function onSubmit(values: zInfer<typeof formSchema>) {
    dispatch(setTheme({
      mainColor: values.mainColor,
      fontFamily: values.fontFamily,
      estimatedUsers: values.estimatedUsers.toString(),
    }))

    if (values.mainColor !== '' && values.fontFamily !== '' && values.logo !== '') {
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
    }
  ]

  const handleFileSelect = (file: File) => {
    console.log('Archivo seleccionado:', file);
  };


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
                        <FileUpload label={item.label} onFileSelect={handleFileSelect} />
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