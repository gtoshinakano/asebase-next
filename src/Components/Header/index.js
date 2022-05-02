import Link from '@Components/Link';
import {  signOut, useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@Styled/Button';
import { useRouter } from 'next/router';


export default function Header() {
  const {data, status} = useSession();
  const loading = status === "loading"
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  console.log(data)

  const isAuth = status === "authenticated"

  return (
    <header className="w-full p-3 bg-rose-500 fixed">
      <nav className="text-white text-sm flex">
        <h4 className="grow">
          {loading ? (
            <i className="ri-loader-5-line mr-3 animate-spin"></i>
          ) : (
            <i className="ri-earth-fill mr-3"></i>
          )}
          {isAuth
            ? t('greeting-msg', { name: data.user.email })
            : t('greeting-msg', { name: 'visitante' })}
        </h4>
        {isAuth && (
          <Button
            onClick={() => router.push('member/dashboard')}
            className="mr-4 bg-white font-semibold text-black"
          >
            <i className="ri-file-user-line mr-2 text-sky-400"></i>Profile
          </Button>
        )}
        {isAuth ? (
          <Button className="bg-gray-200" onClick={() => signOut()}>
            <i className="ri-logout-box-r-line mr-2"></i>Sair
          </Button>
        ) : (
          <Link href="/auth/signin">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
