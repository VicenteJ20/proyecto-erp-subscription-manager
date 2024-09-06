import { auth } from "@/auth";
import { SignIn } from "@/components/signIn";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  
  return (
    <div>
      <SignIn />
    </div>
  );
}
