import Panel from '@Styled/Panel';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const Screen = ({ csrfToken, providers }) => {
  const router = useRouter();
  const { error } = router.query;
  return (
    <div className="w-full sm:w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
      <Panel
        header={
          <h1 className="text-lg font-semibold uppercase">Acesso Asebase</h1>
        }
        shaded
      >
        {error && <SignInError error={error} />}
        <form method="post" action="/api/auth/signin/email">
          <label
            htmlFor="email"
            className="font-semibold text-sm text-gray-600 pb-1 block"
          >
            E-mail de login
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <button
            type="submit"
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-flex items-center justify-center"
          >
            <span className="mr-2">Login por Email</span>
            <i className="ri-arrow-right-s-fill"></i>
          </button>
        </form>
        <hr className="mt-3 mb-4" />
        <div className="w-full">
          {Object.values(providers).map((provider) => {
            if (provider.id === 'email') return null;
            return (
              <button
                type="button"
                key={provider.id}
                className="transition duration-200 bg-white hover:bg-blue-600 hover:text-white focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-black border w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center mb-2 inline-flex items-center justify-center"
                onClick={() => signIn(provider.id)}
              >
                <i className={socialIcons[provider.id]}></i>
                <span className="inline-block ml-2">
                  Entrar com o {provider.name}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

export default Screen;

const socialIcons = {
  google: 'ri-google-line',
};

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};
const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div>{errorMessage}</div>;
};
