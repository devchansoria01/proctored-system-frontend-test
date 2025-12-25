import React from 'react';
import { Mail, Phone, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
    setTimeout(() => {
      const element = document.getElementById('contributors-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sections = [
    { title: 'Platform', links: ['Dashboard', 'Live Monitoring', 'Reports', 'Analytics', 'Settings'] },
    { title: 'Resources', links: ['Documentation', 'API Reference', 'Guides', 'FAQ', 'Support'] },
    { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms', 'Contact'] }
  ];

  return (
    <footer style={{ background: 'rgba(10, 11, 15, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '60px 20px 20px', color: '#e0e0e0', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '10px' }}>
            <div style={{ padding: '8px', border: '1px solid #00d2ff', borderRadius: '8px' }}>🛡️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00d2ff', margin: 0 }}>APS-System</h2>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.8, marginBottom: '20px' }}>
            Next-gen AI proctoring designed to eliminate exam fraud through real-time integrity monitoring and multi-face detection.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.7 }}><Mail size={16} color="#00d2ff" /> admin@proctoredsys.com</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.7 }}><Phone size={16} color="#00d2ff" /> +91 98765 43210</div>
          </div>
          <button style={{ marginTop: '15px', width: '100%', padding: '10px', background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', borderRadius: '8px', opacity: 0.6, cursor: 'default' }}>
            Open Support Ticket <Ticket size={14} />
          </button>
        </div>

        {sections.map((s) => (
          <div key={s.title}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px', borderLeft: '3px solid #00d2ff', paddingLeft: '10px' }}>{s.title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', opacity: 0.6 }}>
              {s.links.map((l) => (
                <li key={l} onClick={l === 'About' && s.title === 'Company' ? handleAboutClick : null} style={{ marginBottom: '10px', cursor: l === 'About' && s.title === 'Company' ? 'pointer' : 'default', color: l === 'About' && s.title === 'Company' ? '#00d2ff' : 'inherit' }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.5 }}>
        <span>© 2025 Admin Proctored Sys. All rights reserved.</span>
        <span>Built with ❤️ by <span style={{ color: '#00d2ff' }}>ProctorTech Labs</span></span>
      </div>
    </footer>
  );
};

export default Footer;