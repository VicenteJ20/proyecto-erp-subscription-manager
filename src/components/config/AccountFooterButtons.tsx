'use client'
import { ChangeBtn } from '@/components/config/ChangeBtn'
import { usePathname } from 'next/navigation'

const formIdByRoute = [
  {
    route: '/account/config',
    id: 'managerForm'
  },
  {
    route: '/account/config/info-pyme',
    id: 'pymeForm'
  },
  {
    route: '/account/config/personalizar-experiencia',
    id: 'experienceForm'
  },
  {
    route: '/account/config/terminos-condiciones',
    id: 'termsForm'
  }
] as any

const AccountFooterButtons = () => {
  const pathname = usePathname()
  const formId = formIdByRoute.find((item: any) => item.route === pathname).id
  return (
    <section className='absolute bottom-0 left-[30rem] right-0'>
      <ChangeBtn id={formId} />
    </section>
  )
}

export { AccountFooterButtons }