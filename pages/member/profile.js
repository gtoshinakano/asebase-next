import Layout from '@Components/Layouts/MemberOnly';
import DashboardView from '@Components/Views/Profile';
import { Member } from '@Classes/Member'
import _ from 'lodash'
import { getSession } from 'next-auth/react';
import superjson from 'superjson';

export default function Page(props) {
  return (
    <Layout title="Perfil de Bolsista" handshakeData={props.userData}>
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
  await member.fetchNikkeiProfile()
  await member.fetchAcademicProfile()
  await member.fetchProfessionalProfile()
  await member.fetchExchangeProfile()
  return {
    props: {
      session: session,
      userData: {
        message: 'High Five 🖐',
        data: {
          uid: member.user_info.id, // users_info id (number)
          auth_id : member.auth_id, // users id (string)
          nikkei_profile: member.nikkei_info ? superjson.stringify(member.nikkei_info) : "{}",
          personal_profile: superjson.stringify(_.pick(member.user_info, personalProfileKeys)),
          academic_profile: member.academic_info ? superjson.stringify(member.academic_info) : "{}",
          professional_profile : member.professional_info ? superjson.stringify(member.professional_info) : "{}",
          exchange_profile: member.exchange_info ? superjson.stringify(member.exchange_info) : "{}",
        }
      },
    },
  };
}

const personalProfileKeys = [
  'id',
  'blocked',
  'is_nikkei',
  'full_name',
  'gender',
  'birth_date',
  'birth_country',
  'birth_state',
  'birth_city',
  'jp_generation',
  'map_latlng',
]

