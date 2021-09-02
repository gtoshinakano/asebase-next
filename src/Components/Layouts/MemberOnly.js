import Sidebar from '@Components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
