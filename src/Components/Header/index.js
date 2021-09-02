import Link from '@Components/Link';
import { signIn, signOut, useSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@Styled/Button';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const { t, lang } = useTranslation('common');

  return (
    <header className="w-full p-3 bg-rose-500 fixed">
      <nav className="text-white text-sm flex">
        <h4 className="flex-grow">
          {loading ? (
            <i className="ri-loader-5-line mr-3 animate-spin"></i>
          ) : (
            <i className="ri-earth-fill mr-3"></i>
          )}
          {session
            ? t('greeting-msg', { name: session.user.email })
            : t('greeting-msg', { name: 'visitante' })}
        </h4>
        {session ? (
          <Button onClick={() => signOut()}>
            <i className="ri-logout-box-r-line mr-2"></i>Sair
          </Button>
        ) : (
          <Link href="/auth/signin">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
