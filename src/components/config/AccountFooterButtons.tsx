'use client'
import { ChangeBtn } from '@/components/config/ChangeBtn'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const formIdByRoute = [
  {
    route: '/account/config',
    id: 'managerForm',
    slice: 'manager'
  },
  {
    route: '/account/config/info-pyme',
    id: 'pymeForm',
    slice: 'company'
  },
  {
    route: '/account/config/personalizar-experiencia',
    id: 'experienceForm',
    slice: 'theme'
  },
  {
    route: '/account/config/seleccionar-suscripcion',
    id: 'subscriptionForm',
    slice: 'subscription'
  },
  {
    route: '/account/config/terminos-condiciones',
    id: 'termsForm',
    slice: 'terms'
  }
] as any

const isPreviousStageComplete = (slice: string, previousSlice: any) => {
  if (!previousSlice) {
    return false
  }

  if (slice === 'manager') {
    const isComplete = Object.values(previousSlice).every((value: any) => value !== '');
    return isComplete;
  }

  if (slice === 'company') {
   
    const { logo, ...cleanSlice } = previousSlice;
    const isComplete = Object.values(cleanSlice).every((value: any) => value !== '');
    return isComplete;
  }

  if (slice === 'experience') {
    const isComplete = Object.values(previousSlice).every((value: any) => value !== '');
    return isComplete;
  }
  return true
};

const AccountFooterButtons = () => {
  const pathname = usePathname()
  const router = useRouter()
  const formId = formIdByRoute.find((item: any) => item.route === pathname).id
  const currentRoute = formIdByRoute.findIndex((item: any) => item.route === pathname)
  const previousRoute = formIdByRoute[currentRoute - 1]
  const oldSlice = useSelector((state: any) => previousRoute ? state.account[previousRoute.slice] : null);

  useEffect(() => {
    if (previousRoute && !isPreviousStageComplete(previousRoute.slice, oldSlice)) {
      router.push(previousRoute.route);
    }
  }, [pathname, previousRoute, router]);

  return (
    <section className='absolute bottom-0 left-[30rem] right-0'>
      <ChangeBtn id={formId} />
    </section>
  )
}

export { AccountFooterButtons }