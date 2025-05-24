// pages/index.js

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E3A8A' }}>
        Bienvenido al cuestionario
      </h1>
      <p>Accede a la ruta:</p>
      <a href="/madurez-digital" style={{ color: '#0087D1' }}>
        /madurez-digital
      </a>
    </div>
  );
}