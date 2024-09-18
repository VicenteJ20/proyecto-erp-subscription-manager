'use client'
import { ChangeBtn } from '@/components/config/ChangeBtn'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { set } from '@/redux/features/account/stageSlice'

const checkLocalStorage = () => {
  const stages = ['manager', 'company', 'theme', 'subscription'];
  let currentStage = 0;

  stages.forEach((stage, index) => {
    const data = localStorage.getItem(stage);
    if (data) {
      const parsedData = JSON.parse(data);
      const isComplete = Object.values(parsedData).every((value: any) => value !== '');
      if (isComplete) {
        currentStage = index + 1;
      }
    }
  });

  return currentStage;
};

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
    route: '/account/config/confirmacion-de-suscripcion',
    id: 'subscriptionConfirmationForm',
    slice: 'subscriptionConfirmation'
  },
  {
    route: '/account/config/terminos-condiciones',
    id: 'termsForm',
    slice: 'terms'
  }
] as any

const isLocalStorageComplete = (key: string) => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return false;

  try {
    const parsedData = JSON.parse(storedData);
    if (typeof parsedData !== 'object' || parsedData === null) return false;

    return Object.values(parsedData).every((value: any) => value !== '');
  } catch (e) {
    return false;
  }
};

const isPreviousStageComplete = (slice: string, previousSlice: any) => {
  if (!previousSlice) {
    return false
  }

  if (slice === 'manager') {
    const isComplete = Object.values(previousSlice).every((value: any) => value !== '');
    const localStorageComplete = isLocalStorageComplete('manager');

    if (!localStorageComplete && isComplete) {
      localStorage.setItem('manager', JSON.stringify(previousSlice));
    }

    return isLocalStorageComplete('manager');
  }

  if (slice === 'company') {
    const { logo, ...cleanSlice } = previousSlice;
    const isComplete = Object.values(cleanSlice).every((value: any) => value !== '');
    const localStorageComplete = isLocalStorageComplete('company');

    if (!localStorageComplete && isComplete) {
      localStorage.setItem('company', JSON.stringify(cleanSlice));
    }

    return isLocalStorageComplete('company');
  }


  if (slice === 'theme') {
    const isComplete = Object.values(previousSlice).every((value: any) => value !== '');
    const localStorageComplete = isLocalStorageComplete('theme');

    if (!localStorageComplete && isComplete) {
      localStorage.setItem('theme', JSON.stringify(previousSlice));
    }

    return isLocalStorageComplete('theme');
  }

  if (slice === 'subscription') {
    const isComplete = Object.values(previousSlice).every((value: any) => value !== '');
    const localStorageComplete = isLocalStorageComplete('subscription');

    if (!localStorageComplete && isComplete) {
      localStorage.setItem('subscription', JSON.stringify(previousSlice));
    }

    return isLocalStorageComplete('subscription');
  }


  return true
};

const AccountFooterButtons = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const formId = formIdByRoute.find((item: any) => item.route === pathname).id
  const currentRoute = formIdByRoute.findIndex((item: any) => item.route === pathname)
  const previousRoute = formIdByRoute[currentRoute - 1]
  const oldSlice = useSelector((state: any) => previousRoute ? state.account[previousRoute.slice] : null);

  useEffect(() => {
    if (pathname === '/account/config/confirmacion-de-suscripcion') {
      const currentStage = checkLocalStorage();
      dispatch(set(currentStage));
      console.log('currentStage', currentStage)
    }
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