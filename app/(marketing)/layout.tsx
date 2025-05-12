export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f5f5fa', minHeight: '100vh', padding: 40 }}>
      <header style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Credenza Marketing
      </header>
      <main>{children || <div>Welcome to the marketing page!</div>}</main>
      <footer style={{ marginTop: 40, color: '#888' }}>
        &copy; {new Date().getFullYear()} Credenza
      </footer>
    </div>
  );
}