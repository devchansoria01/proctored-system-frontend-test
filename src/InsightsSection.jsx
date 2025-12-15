import React from 'react';

export default function InsightsSection() {
  return (
    <section id="insights" style={{ paddingTop: '1px', paddingBottom: '80px', textAlign: 'center' }}>
      <div className="container" style={{ width: '90%', margin: '0 auto' }}>
        
        {/* Section Title */}
        <h2 style={{ 
            fontWeight: '800', 
            marginBottom: '10px', 
            color: '#0ea5a4', 
            fontSize: '2.5rem',
            letterSpacing: '1px' 
        }}>
          Insights
        </h2>
        
        
       

        {/* Cards Row */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          
          {/* CARD 1: CONTACT ADMIN */}
          <div className="insights-card">
            <i className="fa-solid fa-headset insight-icon"></i>
            <h3 className="insight-title">Contact Admin</h3>
            <div className="insight-text">
              <p style={{ margin: '5px 0' }}><i className="fa-solid fa-envelope" style={{marginRight:'8px'}}></i> admin@proctoredsys.com</p>
              <p style={{ margin: '5px 0' }}><i className="fa-solid fa-phone" style={{marginRight:'8px'}}></i> +91 98765 43210</p>
            </div>
            <button style={{ 
                marginTop: '30px', 
                padding: '8px 20px', 
                border: '1px solid #0ea5a4', 
                background: 'transparent', 
                color: '#0ea5a4', 
                borderRadius: '20px', 
                fontWeight: '600',
                fontSize: '0.9rem'
            }}>
                Support Ticket
            </button>
          </div>

          {/* CARD 2: PLATFORM STATUS */}
          <div className="insights-card">
            <i className="fa-solid fa-server insight-icon"></i>
            <h3 className="insight-title">Platform Status</h3>
            <div className="insight-text">
               All systems operational.
            </div>
            <div style={{ marginTop: '20px', textAlign: 'left', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                    <span>Server Uptime</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>99.9%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                    <div style={{ width: '99%', height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', marginTop: '15px', fontSize: '0.9rem' }}>
                    <span>Current Load</span>
                    <span style={{ color: '#0ea5a4', fontWeight: 'bold' }}>24%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                    <div style={{ width: '24%', height: '100%', background: '#0ea5a4', borderRadius: '3px' }}></div>
                </div>
            </div>
          </div>

          {/* CARD 3: LIVE INSIGHTS */}
          <div className="insights-card">
            <i className="fa-solid fa-chart-pie insight-icon"></i>
            <h3 className="insight-title">Live Insights</h3>
            
            <div className="stat-row">
                <div className="stat-item">
                    <h4>98%</h4>
                    <span>Fair Exams</span>
                </div>
                <div className="stat-item">
                    <h4>1.8s</h4>
                    <span>Response</span>
                </div>
                <div className="stat-item">
                    <h4>24x7</h4>
                    <span>Monitoring</span>
                </div>
            </div>
            <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#94a3b8' }}>*Updated in real-time</p>
          </div>

        </div>
      </div>
    </section>
  );
}