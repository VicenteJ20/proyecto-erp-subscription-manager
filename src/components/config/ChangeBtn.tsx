'use client'

import { Button } from "../ui/button"
import { useSelector, useDispatch } from "react-redux"
import { decrement } from "@/redux/features/account/stageSlice"
import { handleExternalSubmit } from "@/utils/formUtils"

const ChangeBtn = ({id}: { id: string}) => {
  const currentStage = useSelector((state: any) => state.currentStage.stage)
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(decrement())
  }


  return (
    <section className='w-full px-12 py-6 gap-2 flex flex-row-reverse'>
      <Button onClick={() => handleExternalSubmit(id)} size='lg' className='px-4 py-4 bg-teal-600 text-white border border-teal-500 text-base hover:text-white'>
        {currentStage === 4 ? 'Confirmar' : 'Siguiente'}
      </Button>
      <Button size='lg' className='px-4 py-4 bg-white text-black border border-zinc-100 text-base hover:text-white'>
        Volver
      </Button>
    </section>
  )
}

export { ChangeBtn }