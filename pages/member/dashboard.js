import Layout from '@Components/Layouts/MemberOnly';
import { getSession } from 'next-auth/client';


export default function Page({session}) {
  return (
    <Layout title="Perfil de Bolsista">
      <div className="w-full min-h-screen flex flex-wrap flex-col font-noto text-gray-700">
        <div className="h-64 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">header</div>
        <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-5/12 flex-grow mx-auto pt-12">
          <h1 className="text-4xl font-black inline-flex"><i className="ri-user-line mr-2"></i> Gabriel Toshinori Nakano</h1>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session: session,
    }
  }
}