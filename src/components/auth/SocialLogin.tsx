'use client'

import { Button } from "../ui/button"
import { RiGoogleFill, RiMicrosoftFill } from '@remixicon/react'

const SocialLogin = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Button className='border border-zinc-100 bg-white text-zinc-700 hover:text-zinc-100 text-base py-5 flex flex-row gap-4'>
        <RiGoogleFill className='w-6 h-6' />
        <p>Iniciar sesión con Google</p>
      </Button>
      <Button className='border border-zinc-100 bg-white text-zinc-700 hover:text-zinc-100 text-base py-5 flex flex-row gap-4'>
        <RiMicrosoftFill className='w-6 h-6' />
        <p>Iniciar sesión con Azure</p>
      </Button>
    </div>
  )
}

export { SocialLogin }