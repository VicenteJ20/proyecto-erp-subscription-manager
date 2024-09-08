import { auth } from "@/auth"
import ReduxProvider from "@/providers/ReduxProvider"
import { SessionProvider } from "next-auth/react"
import { SideBarStage } from "@/components/config/SideBarStage"
import { ChangeBtn } from "@/components/config/ChangeBtn"

export default async function ConfigurationAccountLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <section className='grid grid-cols-1 pl-[30rem] h-screen relative'>
          <SideBarStage />
          <section className='px-12 w-full'>
            {children}
            <section className='absolute bottom-0 left-[30rem] right-0'>
              <ChangeBtn id='managerForm' />
            </section>
          </section>
        </section>
      </ReduxProvider>
    </SessionProvider >
  )
}