import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const { t, lang } = useTranslation('common')

  return (
    <header className="w-full p-3 bg-rose-500 flex">
      <nav className="text-white text-sm">
        <h4 className="flex-grow">
          <i class="ri-earth-fill"></i>{
          session ? t("greeting-msg", session.user.name) : t("greeting-msg", {name: "visitante"})}</h4>
        
      </nav>
    </header>
  );
}
