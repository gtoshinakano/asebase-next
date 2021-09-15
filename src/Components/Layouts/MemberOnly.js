import Sidebar from '@Components/Sidebar';
import Head from 'next/head';
import { useQueryClient, useQuery } from 'react-query';
import { handshake } from '@Utils/defaultQueries';

export default function Layout({ children, title }) {

  const client = useQueryClient()
  client.setQueryDefaults('handshake', { queryFn: handshake })
  const {isLoading, data} = useQuery('handshake', {staleTime: Infinity})


  console.log(isLoading, data)
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
