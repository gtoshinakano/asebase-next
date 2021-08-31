import Layout from '@Components/Layouts/NotSigned';
import SignIn from '@Views/SignIn'
import { providers, getSession, csrfToken } from 'next-auth/client';

export default function Page({providers, csrfToken}) {
  console.log(providers, csrfToken);
  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <SignIn/>
      </div>
    </Layout>
  );
}

SignIn.getInitialProps = async (context) => {
  const {req, res} = context
  const session = await getSession({req})
  if(session && res && session.accessToken){
    res.writeHead(302, {Location: "/"})
    res.end()
    return
  }
  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context)
  }

}

