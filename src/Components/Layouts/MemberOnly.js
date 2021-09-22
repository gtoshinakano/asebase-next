import Sidebar from '@Components/Sidebar';
import Head from 'next/head';
import { useQueryClient, useQuery } from 'react-query';
import { handshake } from '@Utils/defaultQueries';
import ScreenLoader from '@Styled/ScreenLoader';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/client"

export default function Layout({ children, title }) {

  const client = useQueryClient()
  client.setQueryDefaults('handshake', { queryFn: handshake })
  const {isLoading, data, isFetched} = useQuery('handshake', {staleTime: Infinity})

  const router = useRouter()

  if(isFetched && !data) router.push('/')

  if(data?.action === "force-sign-out-user") {
    signOut()
    router.push('/')
  }



  return (
    <>
      <Head>
        <title>Área de Membros - {title} - ASEBASE</title>
      </Head>
      <ScreenLoader title="Um momento" message="Aguarde enquanto carregamos alguns dados" isLoading={isLoading} />
      <Sidebar />
      <main className="pl-10">{children}</main>
    </>
  );
}
