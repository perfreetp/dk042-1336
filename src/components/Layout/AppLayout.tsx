import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} />
        <main className="flex-1 overflow-auto scrollbar-thin p-6">{children}</main>
      </div>
    </div>
  );
}
