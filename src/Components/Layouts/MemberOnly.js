import Sidebar from '@Components/Sidebar';
import Head from 'next/head';
import { useQueryClient, useQuery } from 'react-query';
import { handshake } from '@Utils/defaultQueries';
import ScreenLoader from '@Styled/ScreenLoader';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import { Transition } from '@headlessui/react';
import { getPersonalProfile } from '@Utils/defaultQueries';

export default function Layout({ children, title, handshakeData }) {
  const client = useQueryClient();
  client.setQueryDefaults('handshake', {
    queryFn: handshake,
    staleTime: Infinity,
    initialData: handshakeData
  });
  const { isLoading, data, isFetched } = useQuery('handshake');
  if (data && data.auth_id)
    client.setQueryDefaults(['personal-profile', data.auth_id], {
      queryFn: getPersonalProfile,
      staleTime: Infinity,
    });

  const router = useRouter();

  if (isFetched && !data) router.push('/');

  if (data && data.action === 'force-sign-out-user') {
    signOut();
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Área de Membros - {title} - ASEBASE</title>
      </Head>
      <ScreenLoader
        title="Um momento"
        message="Aguarde enquanto carregamos alguns dados"
        isLoading={isLoading}
      />
      <Sidebar />
      {isLoading && (
        <main className="pl-10">
          <Skeleton width="100%" className="h-64" />
        </main>
      )}
      <Transition
        show={!isLoading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <main className="pl-10 print:pl-0 tracking-wide">{children}</main>
      </Transition>
    </>
  );
}
