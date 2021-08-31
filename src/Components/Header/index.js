import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();

  return (
    <header>
      <nav className="text-red-500 text-sm">Use in Next.js Version 3.*</nav>
    </header>
  );
}
