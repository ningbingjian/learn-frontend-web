import { createRoot } from 'react-dom/client';

function ExportButton({ canExport }) {
  return (
    <button type="button" disabled={!canExport}>
      导出报表
    </button>
  );
}

function ActionGroup({ user }) {
  return <ExportButton canExport={user.canExport} />;
}

function Toolbar({ user }) {
  return (
    <nav>
      <ActionGroup user={user} />
    </nav>
  );
}

function Dashboard({ user }) {
  return (
    <section>
      <h2>Drilling 版本</h2>
      <Toolbar user={user} />
    </section>
  );
}

function ComposedToolbar({ actions }) {
  return <nav>{actions}</nav>;
}

function App() {
  const currentUser = {
    name: 'Ada',
    canExport: true,
  };

  return (
    <main>
      <h1>RE-KP076：Props Drilling 的识别</h1>
      <Dashboard user={currentUser} />

      <section>
        <h2>组合后的版本</h2>
        <ComposedToolbar
          actions={<ExportButton canExport={currentUser.canExport} />}
        />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
