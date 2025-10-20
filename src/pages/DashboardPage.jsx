import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section>
        <h2>User Info</h2>
        <p>Name: {user?.name || 'N/A'}</p>
        <p>Email: {user?.email || 'N/A'}</p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h3>Account</h3>
        <p>Status: Active</p>
        <p>Member since: Today</p>
      </section>
    </div>
  );
}
