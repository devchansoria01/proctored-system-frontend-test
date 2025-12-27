import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [text, setText] = useState('');
  const fullText =
    "APS operates as a dual-interface ecosystem built on transparency. While administrators orchestrate integrity from a live command center, users utilize a personal hub to navigate their schedules and performance records.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="hero-section"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <h1
          className="theme-text-primary"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            lineHeight: '1.1',
          }}
        >
          <span className="liquid-chrome">Real-time Proctoring</span>
          
          <span
            className="theme-text-secondary"
            style={{
              display: 'block',
              fontSize: '0.4em',
              fontWeight: '600',
              marginTop: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            Where <span className="highlight">Performance</span> meets{' '}
            <span className="highlight">Integrity</span>
          </span>
        </h1>

        <div
          style={{
            width: '120px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #0ea5a4, transparent)',
            margin: '20px auto',
            borderRadius: '2px',
          }}
        />

        <p className="theme-text-secondary" style={{ fontSize: '1.1rem', opacity: 0.8 }}>
          Ensuring <strong>fair</strong>, <strong>verifiable</strong> contests — in real time.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '50px',
          width: '90%',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1.2, minWidth: '300px' }}>
          <h3
            style={{
              fontWeight: '800',
              color: 'var(--accent)',
              marginBottom: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}
          >
            APS — Dual-End Architecture
          </h3>

          <p
            className="theme-text-secondary"
            style={{ minHeight: '60px', fontSize: '1.15rem', lineHeight: '1.6', margin: '0 0 20px', fontWeight: '500' }}
          >
            {text}
            <span className="typing-cursor"></span>
          </p>

          <div 
            style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              borderLeft: '3px solid #0ea5a4', 
              paddingLeft: '20px',
              color: '#94a3b8' 
            }}
          >
            <p style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#fff' }}>Admin Command:</strong> Surgical precision for live telemetry, instant interventions, and high-fidelity monitoring.
            </p>
            <p>
              <strong style={{ color: '#fff' }}>User Hub:</strong> A dedicated portal to view <strong>Live Schedules</strong> and review <strong>Performance Records</strong>.
            </p>
          </div>
        </div>

        <div style={{ flex: 0.8, minWidth: '300px', textAlign: 'center' }}>
          <div className="hero-video-card">
            <video
              muted
              loop
              autoPlay
              style={{
                width: '100%',
                borderRadius: '18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
            </video>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '100px', width: '90%', margin: '100px auto 0' }}>
        <h3
          style={{
            textAlign: 'center',
            fontWeight: '800',
            color: '#0ea5a4',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '60px',
          }}
        >
          How APS Works
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div className="flow-card theme-card">
            <div className="step-badge">1</div>
            <h5 className="flow-title theme-text-primary">Integrity Monitoring</h5>
            <p className="flow-desc theme-text-secondary">
              AI continuously scans the environment for suspicious signs.
            </p>
            <div className="flow-tags">
              <span className="tag-teal">
                <i className="fa-solid fa-eye"></i> Gaze Tracking
              </span>
              <span className="tag-blue">
                <i className="fa-solid fa-users"></i> Multi-Face
              </span>
              <span className="tag-purple">
                <i className="fa-solid fa-desktop"></i> Screen Share
              </span>
            </div>
          </div>

          <div className="flow-arrow">
            <i className="fa-solid fa-angle-right"></i>
          </div>

          <div className="flow-card theme-card">
            <div className="step-badge">2</div>
            <h5 className="flow-title theme-text-primary">Dual Score Eval</h5>
            <p className="flow-desc theme-text-secondary">
              Every participant is rated on two live metrics.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <div
                className="score-box-default"
                style={{ padding: '10px', borderRadius: '10px', flex: 1 }}
              >
                <strong
                  className="theme-text-primary"
                  style={{ display: 'block', fontSize: '0.85rem' }}
                >
                  Contest Score
                </strong>
                <span className="theme-text-secondary" style={{ fontSize: '0.75rem' }}>
                  Technical Skill
                </span>
              </div>

              <div
                className="score-box-success"
                style={{ padding: '10px', borderRadius: '10px', flex: 1 }}
              >
                <strong
                  style={{
                    color: '#86efac',
                    display: 'block',
                    fontSize: '0.85rem',
                  }}
                >
                  Confidence Score
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#86efac' }}>Trust Level</span>
              </div>
            </div>
          </div>

          <div className="flow-arrow">
            <i className="fa-solid fa-angle-right"></i>
          </div>

          <div className="flow-card theme-card">
            <div className="step-badge">3</div>
            <h5 className="flow-title theme-text-primary">Admin Control</h5>
            <p className="flow-desc theme-text-secondary">
              Admins make the final call based on live evidence.
            </p>
            <ul
              className="theme-text-secondary"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '15px 0 0',
                fontSize: '0.85rem',
                textAlign: 'left',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <i
                  className="fa-solid fa-check-circle"
                  style={{ color: '#0ea5a4', marginRight: '8px' }}
                ></i>
                View Live Feeds
              </li>
              <li style={{ marginBottom: '8px' }}>
                <i
                  className="fa-solid fa-triangle-exclamation"
                  style={{ color: '#f59e0b', marginRight: '8px' }}
                ></i>
                Review Flags
              </li>
              <li>
                <i
                  className="fa-solid fa-gavel"
                  style={{ color: '#ef4444', marginRight: '8px' }}
                ></i>
                Warn / Terminate
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '800px',
          margin: '80px auto 0',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <p
          className="theme-text-secondary"
          style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            lineHeight: '1.8',
            fontStyle: 'italic',
          }}
        >
          "APS bridges the gap between automated detection and human authority. By filtering noise
          and highlighting intent, we ensure that{' '}
          <span
            style={{ color: '#0ea5a4', fontWeight: '800', fontStyle: 'normal' }}
          >
            integrity
          </span>{' '}
          is never a bottleneck to{' '}
          <span
            style={{ color: '#3b82f6', fontWeight: '800', fontStyle: 'normal' }}
          >
            performance
          </span>
          ."
        </p>
        <div
          style={{
            width: '60px',
            height: '3px',
            background: '#cbd5e1',
            margin: '30px auto 0',
            borderRadius: '2px',
          }}
        ></div>
      </div>

      <style>{`
        .liquid-chrome {
          background: linear-gradient(
            -45deg, 
            #ffffff 20%, 
            #0ea5a4 40%, 
            #22d3ee 50%, 
            #0ea5a4 60%, 
            #ffffff 80%
          );
          background-size: 400% 400%;
          color: #fff;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fluidGradient 8s ease-in-out infinite;
          display: inline-block;
          filter: drop-shadow(0 4px 8px rgba(14, 165, 164, 0.2));
        }

        @keyframes fluidGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .flow-card {
          flex: 1;
          min-width: 280px;
          padding: 35px 25px;
          border-radius: 24px;
          position: relative;
          border-top: 6px solid transparent;
          background-image:
            linear-gradient(var(--card-bg), var(--card-bg)),
            linear-gradient(90deg, #0ea5a4, #3b82f6);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          transition: all 0.4s ease;
        }

        :root { --card-bg: white; }
        .dark, .dark-mode { --card-bg: #1e293b; }

        .flow-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(14, 165, 164, 0.2);
        }

        .step-badge {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #0ea5a4 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          border: 5px solid var(--card-bg);
          box-shadow: 0 10px 20px rgba(14, 165, 164, 0.3);
        }

        .flow-title { font-weight: 800; margin-top: 10px; margin-bottom: 10px; font-size: 1.25rem; }
        .flow-desc { font-size: 0.95rem; line-height: 1.6; }
        .flow-tags span { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; margin: 4px; font-weight: 700; }
        .flow-arrow { display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #cbd5e1; animation: pulse-arrow 2s infinite ease-in-out; }

        @keyframes pulse-arrow {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(10px); opacity: 1; color: #0ea5a4; }
        }

        @media (max-width: 900px) {
          .flow-arrow { display: none; }
          .flow-card { margin-bottom: 40px; }
        }
      `}</style>
    </section>
  );
}