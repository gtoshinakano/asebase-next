import Sidebar from '@Components/Sidebar';
import Head from 'next/head';

export default function Layout({ children, title }) {
  return (
    <>
      <Head><title>Área de Membros - {title} - ASEBASE</title></Head>
      <div className="relative min-h-screen flex">
        <Sidebar />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
}
