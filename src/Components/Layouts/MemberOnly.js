import Sidebar from '@Components/Sidebar';
import Head from 'next/head';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>Área de Membros - {title} - ASEBASE</title>
      </Head>
      <Sidebar />
      <main className="pl-10">{children}</main>
    </>
  );
}
