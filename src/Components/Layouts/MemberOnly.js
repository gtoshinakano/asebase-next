import React from 'react'
import Sidebar from '@Components/Sidebar';
import Head from 'next/head';
import { useQueryClient } from 'react-query';
import { handshake } from '@Utils/defaultQueries';
import ScreenLoader from '@Styled/ScreenLoader';
import * as fn from '@Utils/defaultQueries';
import superjson from 'superjson'

export const AuthContext = React.createContext()

export default function Layout({ children, title, handshakeData }) {
  const client = useQueryClient();
  client.setQueryDefaults('handshake', {
    staleTime: Infinity,
    initialData: handshakeData
  });
  const { data } = handshakeData
  
  if (data && data.auth_id){
    client.setQueryDefaults(['personal-profile', data.auth_id], {
      queryFn: fn.getPersonalProfile,
      staleTime: Infinity,
      initialData: superjson.parse(handshakeData.data.personal_profile)
    });
    client.setQueryDefaults( ['nikkei-profile', data.auth_id], {
      queryFn: fn.getNikkeiProfile,
      staleTime: Infinity,
      initialData: superjson.parse(handshakeData.data.nikkei_profile)
    })
    client.setQueryDefaults( ['academic-profile', data.auth_id], {
      queryFn: fn.getAcademicProfile,
      staleTime: Infinity,
      initialData: superjson.parse(handshakeData.data.academic_profile)
    })
    client.setQueryDefaults( ['professional-profile', data.auth_id], {
      queryFn: fn.getProfessionalProfile,
      staleTime: Infinity,
      initialData: superjson.parse(handshakeData.data.professional_profile)
    })
    client.setQueryDefaults( ['exchange-profile', data.auth_id], {
      queryFn: fn.getExchangeProfile,
      staleTime: Infinity,
      initialData: superjson.parse(handshakeData.data.exchange_profile)
    })
  }
  // const router = useRouter();

  // if (isFetched && !data) router.push('/');

  // if (data && data.action === 'force-sign-out-user') {
  //   signOut();
  //   router.push('/');
  // }

  return (
    <AuthContext.Provider value={handshakeData}>
      <Head>
        <title>Área de Membros - {title} - ASEBASE</title>
      </Head>
      {/* <ScreenLoader
        title="Um momento"
        message="Aguarde enquanto carregamos alguns dados"
        isLoading={false}
      /> */}
      <Sidebar />
      <main className="pl-10 print:pl-0 tracking-wide">{children}</main>
    </AuthContext.Provider>
  );
}
