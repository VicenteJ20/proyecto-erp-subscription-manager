import { auth } from "@/auth"
import ReduxProvider from "@/providers/ReduxProvider"
import { SessionProvider } from "next-auth/react"


export default async function ConfigurationAccountLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </SessionProvider >
  )
}