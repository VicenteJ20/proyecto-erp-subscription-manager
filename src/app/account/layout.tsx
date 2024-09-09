import { auth } from "@/auth"
import ReduxProvider from "@/providers/ReduxProvider"
import { SessionProvider } from "next-auth/react"
import { SideBarStage } from "@/components/config/SideBarStage"
import { AccountFooterButtons } from "@/components/config/AccountFooterButtons"

export default async function ConfigurationAccountLayout(
  { children }: { children: React.ReactNode
  }
) {
  const session = await auth()
  
  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <section className='grid grid-cols-1 pl-[30rem] min-h-screen relative'>
          <SideBarStage />
          <section className='px-12 w-full pb-12'>
            {children}
            <AccountFooterButtons />
          </section>
        </section>
      </ReduxProvider>
    </SessionProvider >
  )
}