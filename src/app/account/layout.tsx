import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { store } from "../redux/store"
import { Provider } from "react-redux"

export default async function ConfigurationAccountLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider >
  )
}