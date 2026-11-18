import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>Tableau de bord sécurisé</h1>
      <p>Bienvenue sur <strong>secure-web-platform</strong> ! Tu es bien connecté.</p>
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 15px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Se déconnecter
      </button>
    </div>
  );
}