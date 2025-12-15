import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [text, setText] = useState('');
  const fullText = "APS enables administrators to monitor live contests, detect suspicious behavior, and take immediate action — all from a single dashboard.";

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
    <section id="about" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      
      {/* ================= HERO HEADER ================= */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 20px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '900', color: '#0f172a', lineHeight: '1.2' }}>
          Real-time Proctoring
          <span style={{ display: 'block', fontSize: '0.45em', fontWeight: '500', color: '#475569', marginTop: '12px' }}>
            Where <span className="highlight">Performance</span> meets <span className="highlight">Integrity</span>
          </span>
        </h1>
        <div style={{ width: '110px', height: '4px', background: 'linear-gradient(90deg, #0ea5a4, #22d3ee)', margin: '15px auto', borderRadius: '2px' }} />
        <p style={{ fontSize: '1.1rem', color: '#000000ff' }}>
          Ensuring <strong>fair</strong>, <strong>verifiable</strong> contests — in real time.
        </p>
      </div>

      {/* ================= MAIN SPLIT (DESCRIPTION & a photo) ================= */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', width: '90%', margin: '0 auto', alignItems: 'center' }}>
        
        {/* LEFT TEXT */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ fontWeight: '700', color: 'var(--accent)', marginBottom: '15px' }}>APS — Admin Proctored System</h3>
          <p style={{ minHeight: '60px', fontSize: '1.1rem', lineHeight: '1.6', margin: '0 0 20px', color: '#000000ff' }}>
            {text}<span className="typing-cursor"></span>
          </p>
          <p style={{ fontSize: '1.rem', color: '#000000ff', lineHeight: '1.6' }}>
            Unlike traditional systems that rely on post-exam reviews, APS provides administrators with live insights and actionable controls during the examination itself.
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
          <video muted loop autoPlay style={{ width: '100%', borderRadius: '18px', border: '3px solid var(--accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
          </video>
        </div>
      </div>


      {/* ================= FLOWCHART SECTION ================= */}
      <div style={{ marginTop: '100px', width: '90%', margin: '100px auto 0' }}>
        
        <h3 style={{ textAlign: 'center', fontWeight: '800', color: '#0ea5a4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '50px' }}>
          How APS Works
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '20px', flexWrap: 'wrap' }}>

          {/* STEP 1 */}
          <div className="flow-card">
            <div className="step-badge">1</div>
            <h5 className="flow-title">Integrity Monitoring</h5>
            <p className="flow-desc">AI continuously scans the environment for suspicious signs.</p>
            <div className="flow-tags">
               <span className="tag-teal"><i className="fa-solid fa-eye"></i> Gaze Tracking</span>
               <span className="tag-blue"><i className="fa-solid fa-users"></i> Multi-Face</span>
               <span className="tag-purple"><i className="fa-solid fa-desktop"></i> Screen Share</span>
            </div>
          </div>

          <div className="flow-arrow"><i className="fa-solid fa-angle-right"></i></div>

          {/* STEP 2 */}
          <div className="flow-card">
            <div className="step-badge">2</div>
            <h5 className="flow-title">Dual Score Eval</h5>
            <p className="flow-desc">Every participant is rated on two live metrics.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', flex: 1, border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#334155', display:'block', fontSize:'0.85rem' }}>Contest Score</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Technical Skill</span>
                </div>
                <div style={{ background: '#f0fdf4', padding: '10px', borderRadius: '10px', flex: 1, border: '1px solid #bbf7d0' }}>
                    <strong style={{ color: '#15803d', display:'block', fontSize:'0.85rem' }}>Confidence Score</strong>
                    <span style={{ fontSize: '0.75rem', color: '#15803d' }}>Trust Level</span>
                </div>
            </div>
          </div>

          <div className="flow-arrow"><i className="fa-solid fa-angle-right"></i></div>

          {/* STEP 3 */}
          <div className="flow-card">
            <div className="step-badge">3</div>
            <h5 className="flow-title">Admin Control</h5>
            <p className="flow-desc">Admins make the final call based on live evidence.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '15px 0 0', fontSize: '0.85rem', color: '#475569', textAlign: 'left' }}>
               <li style={{marginBottom:'8px'}}><i className="fa-solid fa-check-circle" style={{color:'#0ea5a4', marginRight:'8px'}}></i>View Live Feeds</li>
               <li style={{marginBottom:'8px'}}><i className="fa-solid fa-triangle-exclamation" style={{color:'#f59e0b', marginRight:'8px'}}></i>Review Flags</li>
               <li><i className="fa-solid fa-gavel" style={{color:'#ef4444', marginRight:'8px'}}></i>Warn / Terminate</li>
            </ul>
          </div>

        </div>
      </div>


      {/* ================= NEW: CONCLUDING STATEMENT ================= */}
      <div style={{ maxWidth: '800px', margin: '80px auto 0', textAlign: 'center', padding: '0 20px' }}>
        <p style={{ fontSize: '1.25rem', color: '#334155', fontWeight: '500', lineHeight: '1.8', fontStyle: 'italic' }}>
          "APS bridges the gap between automated detection and human authority. 
          By filtering noise and highlighting intent, we ensure that <span style={{color: '#0ea5a4', fontWeight: '800', fontStyle: 'normal'}}>integrity</span> is never a bottleneck to <span style={{color: '#3b82f6', fontWeight: '800', fontStyle: 'normal'}}>performance</span>."
        </p>
        <div style={{ width: '60px', height: '3px', background: '#cbd5e1', margin: '30px auto 0', borderRadius: '2px' }}></div>
      </div>
      {/* ============================================================= */}


      {/* --- CSS STYLES --- */}
      <style>{`
        .flow-card {
            background: white;
            flex: 1;
            min-width: 280px;
            padding: 35px 25px;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.05);
            position: relative;
            border-top: 6px solid transparent;
            background-image: linear-gradient(white, white), linear-gradient(90deg, #0ea5a4, #3b82f6);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            transition: all 0.4s ease;
        }
        .flow-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(14, 165, 164, 0.15);
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
            font-size: 1.2rem;
            border: 5px solid white;
            box-shadow: 0 10px 20px rgba(14, 165, 164, 0.3);
        }
        .flow-title {
            font-weight: 800;
            color: #1e293b;
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 1.25rem;
        }
        .flow-desc {
            font-size: 0.95rem;
            color: #64748b;
            line-height: 1.6;
        }
        .flow-tags span {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            margin: 4px;
            font-weight: 700;
        }
        .tag-teal { background: #e0f2f1; color: #00695c; }
        .tag-blue { background: #e3f2fd; color: #1565c0; }
        .tag-purple { background: #f3e5f5; color: #7b1fa2; }
        .flow-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #cbd5e1;
            animation: pulse-arrow 2s infinite ease-in-out;
        }
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