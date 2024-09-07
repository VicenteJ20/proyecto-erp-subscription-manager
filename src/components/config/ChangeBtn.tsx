'use client'

import { Button } from "../ui/button"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "@/redux/features/account/stageSlice"

const ChangeBtn = () => {
  const currentStage = useSelector((state: any) => state.currentStage.stage)
  const dispatch = useDispatch()

  const handleNext = () => {
    dispatch(increment())
  }

  const handleBack = () => {
    dispatch(decrement())
  }

  return (
    <section>
      <Button onClick={handleNext} className='bg-zinc-500 text-white'>Avanzar</Button>
      <Button onClick={handleBack} className='bg-zinc-500 text-white'>Volver</Button>
    </section>
  )
}

export { ChangeBtn }