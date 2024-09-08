'use client'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useSelector } from 'react-redux'

export const stages = [
  {
    id: 0,
    title: 'Información personal',
    description: 'Complete su información personal'
  },
  {
    id: 1,
    title: 'Información de la PYME',
    description: 'Complete la información de su empresa'
  },
  {
    id: 2,
    title: 'Personalice su experiencia',
    description: 'Personalice su cuenta y la de su empresa'
  },
  {
    id: 3,
    title: 'Seleccione su suscripción',
    description: 'Seleccione el plan que más se ajuste a sus necesidades'
  },
  {
    id: 4,
    title: 'Confirmación de suscripción',
    description: 'Realice la verificación del método de pago en mercado pago y confirme su suscripción'
  }
]

const SideBarStage = () => {
  const currentStage = useSelector((state: any) => state.currentStage)

  return (
    <aside className='bg-zinc-100 fixed left-0 bottom-0 w-[30rem] top-0 p-12'>
      <header className={`flex flex-row gap-2 items-center mb-4`}>
        <Image src='/logo-2-teal.svg' alt='epyme logo' width={36} height={36} />
        <h2 className='text-2xl font-bold'>EPYME</h2>
      </header>
      <p className='text-sm'>Complete los siguientes pasos para configurar su cuenta.</p>
      <div>
        <ul className='flex flex-col gap-8 mt-8 w-full'>
          {
            stages && stages.length > 0 && stages.map((item, index) => (
              <li key={index} className='flex flex-row gap-x-4 items-start mt-1'>
                <Avatar>
                  <AvatarFallback  className={`${currentStage.stage > item.id ? 'bg-green-600' : currentStage.stage === item.id ? 'bg-yellow-500' : currentStage.stage < item.id && 'bg-zinc-200 text-zinc-800'}`}>
                    {item.id + 1}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1.5'>
                  <h3 className='text-lg font-medium text-zinc-900'>{item.title}</h3>
                  <p className='text-sm text-zinc-600'>{item.description}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </aside>
  )
}

export { SideBarStage }