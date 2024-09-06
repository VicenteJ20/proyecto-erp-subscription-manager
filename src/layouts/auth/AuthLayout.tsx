import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="w-screen px-8 py-6 fixed bg-[#f7f7f7] top-0 left-0">
        <Link href='/' className='flex flex-row gap-2 items-center'>
          <Image src='/logo-2-teal.svg' alt='EPYME logo' width={100} height={100} className='w-10 h-10' />
          <h2 className='font-bold text-2xl'>EPYME</h2>
        </Link>
      </nav>
      <main className='w-full h-full pt-16 grid grid-cols-1 sm:grid-cols-2'>
        <section>{children}</section>
        <section></section>
      </main>
    </>
  );
}