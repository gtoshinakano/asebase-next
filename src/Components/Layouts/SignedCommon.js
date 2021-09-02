import Header from '@Components/Header';
import Footer from '@Components/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex">
        <aside className="min-h-screen bg-yellow-400">oi</aside>
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
    </>
  );
}
