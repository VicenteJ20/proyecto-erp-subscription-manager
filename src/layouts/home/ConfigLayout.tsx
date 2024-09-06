
export default function ConfigLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-full h-full'>
      {children}
    </main>
  );
}