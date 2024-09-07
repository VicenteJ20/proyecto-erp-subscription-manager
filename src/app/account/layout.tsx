import { auth } from "@/auth"
import ReduxProvider from "@/providers/ReduxProvider"
import { SessionProvider } from "next-auth/react"
import { SideBarStage } from "@/components/config/SideBarStage"

export default async function ConfigurationAccountLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <section className='min-h-screen flex items-center justify-center bg-white'>
          <SideBarStage />
          {children}
        </section>
      </ReduxProvider>
    </SessionProvider >
  )
}