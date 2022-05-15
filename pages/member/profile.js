import Layout from '@Components/Layouts/MemberOnly';
import DashboardView from '@Components/Views/Profile';
import { Member } from '@Classes/Member'

import { getSession } from 'next-auth/react';

export default function Page(props) {
  return (
    <Layout title="Perfil de Bolsista" handshakeData={props.handshakeData}>
      <div className="w-full min-h-screen flex flex-wrap flex-col font-notoJP text-gray-700 pb-40">
        <div className="h-64 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 print:hidden"></div>
        <DashboardView />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if(!session){
    return { redirect: { destination: '/' } };
  }
  const member = await Member.init(session.user.email)
  if (member.user_info.blocked) {
    return { redirect: { destination: '/' } }; //TODO blocked user msg page
  }
  console.log(member)
  return {
    props: {
      session: session,
      handshakeData: {
        message: 'High Five 🖐',
        data: {
          uid: member.user_info.id,
          auth_id : member.auth_id
        }
      }
    },
  };
}
