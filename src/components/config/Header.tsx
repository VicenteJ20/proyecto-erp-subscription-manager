'use client'
import { useSelector } from "react-redux"
import { stages } from "./SideBarStage"

interface HeaderProps {
  title: string,
  description?: string
}

const HeaderStepAccount = ({ title, description }: HeaderProps) => {
  const currentStage = useSelector((state: any) => state.currentStage.stage)
  const totalStages = stages.length
  
  return (
    <header className='flex flex-col gap-2'>
      <p className='font-normal text-teal-600'>Paso {currentStage +1} de {totalStages}</p>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-sm'>{description}</p>
    </header>
  )
}

export { HeaderStepAccount }