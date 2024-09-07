import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  
  if (session) return redirect('/account/config')
  return (
    <>
      <nav className="px-8 py-6 fixed bg-[#fafafa] top-0 left-0 w-screen">
        <Link href='/' className='flex flex-row gap-2 items-center'>
          <Image src='/logo-2-teal.svg' alt='EPYME logo' width={100} height={100} className='w-10 h-10' />
          <h2 className='font-bold text-2xl'>EPYME</h2>
        </Link>
      </nav>
      <main className='w-full h-screen grid grid-cols-1 sm:grid-cols-2 p-4 '>
        <section className='h-full flex flex-col items-start justify-center'>{children}</section>
        <AspectRatio ratio={16 / 9} className='hidden sm:block bg-zinc-500 rounded-lg'>
        </AspectRatio>
      </main>
    </>
  );
}