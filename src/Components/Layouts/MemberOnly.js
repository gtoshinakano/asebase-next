import Sidebar from '@Components/Sidebar';
import Head from 'next/head';
import { useQueryClient, useQuery } from 'react-query';
import { handshake } from '@Utils/defaultQueries';
import ScreenLoader from '@Styled/ScreenLoader';
import { Transition } from '@headlessui/react'

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
      <Transition
        show={isLoading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ScreenLoader title="Um momento" message="Aguarde enquanto carregamos alguns dados" />
      </Transition>
      <Sidebar />
      <main className="pl-10">{children}</main>
    </>
  );
}
