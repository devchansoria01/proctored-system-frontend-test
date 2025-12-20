import React from 'react';

const LiveMonitoringTable = () => {
  const liveUsers = [
    { id: 1, name: 'User 1', detected: 'Screen Share (SS)', link: '#', confidence: 45, status: 'High Risk' },
    { id: 2, name: 'User 2', detected: 'Multi-Face',        link: '#', confidence: 88, status: 'Safe' },
    { id: 3, name: 'User 3', detected: 'No Face',           link: '#', confidence: 12, status: 'Critical' },
    { id: 4, name: 'User 4', detected: 'None',              link: '',  confidence: 95, status: 'Safe' },
  ];

  const statusChipClass = (status) => {
    if (status === 'Safe') return 'chip-safe';
    if (status === 'High Risk') return 'chip-warn';
    return 'chip-critical';
  };

  const barColor = (c) => (c < 50 ? '#f97373' : c < 80 ? '#facc15' : '#22c55e');

  return (
    <div className="live-card">
      <div className="live-card-header">
        <div className="live-title-wrap">
          <span className="live-dot" />
          <h3 className="live-title">Live Contest Monitoring</h3>
        </div>
        <span className="live-pill">LIVE NOW</span>
      </div>

      <div className="live-header-row">
        <span>Participant</span>
        <span>Detected Evidence</span>
        <span>Confidence</span>
        <span className="text-end">Actions</span>
      </div>

      <div className="live-rows">
        {liveUsers.map((u) => (
          <div key={u.id} className="live-row">
            <div className="live-cell user-cell">
              <span className="user-badge">{u.name}</span>
            </div>

            <div className="live-cell evidence-cell">
              {u.link ? (
                <a href={u.link} className="evidence-link">
                  📸 {u.detected}
                </a>
              ) : (
                <span className="evidence-none">None</span>
              )}
            </div>

            <div className="live-cell confidence-cell">
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${u.confidence}%`, backgroundColor: barColor(u.confidence) }}
                />
              </div>
              <span className="confidence-label">{u.confidence}%</span>
              <span className={`status-chip ${statusChipClass(u.status)}`}>{u.status}</span>
            </div>

            <div className="live-cell actions-cell">
              <button className="btn-chip warn-btn">⚠️ Warn</button>
              <button className="btn-chip remove-btn">🚫 Remove</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .live-card {
          background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 55%),
                      rgba(15, 23, 42, 0.95);
          border-radius: 26px;
          padding: 28px 26px 24px;
          box-shadow: 0 28px 60px rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          color: #e5e7eb;
          width: 150%;
          max-width: 980px;
        }

        .live-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .live-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .live-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #f97373;
          box-shadow: 0 0 12px rgba(248, 113, 113, 0.8);
        }

        .live-title {
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .live-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          box-shadow: 0 0 18px rgba(248, 113, 113, 0.7);
        }

        .live-header-row {
          display: grid;
          grid-template-columns: 1.1fr 1.4fr 1.5fr 1.2fr;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          border-bottom: 1px solid rgba(148, 163, 184, 0.25);
          padding-bottom: 6px;
          margin-bottom: 6px;
        }

        .live-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }

        .live-row {
          display: grid;
          grid-template-columns: 1.1fr 1.4fr 1.5fr 1.2fr;
          align-items: center;
          padding: 10px 10px;
          border-radius: 18px;
          background: radial-gradient(circle at top left, rgba(15, 118, 110, 0.2), transparent 55%),
                      rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(30, 64, 175, 0.45);
        }

        .live-row + .live-row {
          margin-top: 2px;
        }

        .live-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .user-badge {
          font-weight: 700;
          color: #e5e7eb;
        }

        .evidence-link {
          color: #38bdf8;
          font-weight: 600;
          text-decoration: none;
        }

        .evidence-link:hover {
          text-decoration: underline;
        }

        .evidence-none {
          color: #6b7280;
          font-style: italic;
        }

        .confidence-cell {
          gap: 8px;
          flex-wrap: wrap;
        }

        .confidence-bar {
          position: relative;
          width: 90px;
          height: 6px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.4s ease;
        }

        .confidence-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #e5e7eb;
        }

        .status-chip {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid transparent;
        }

        .chip-safe {
          background: rgba(22, 163, 74, 0.18);
          color: #bbf7d0;
          border-color: rgba(34, 197, 94, 0.5);
        }

        .chip-warn {
          background: rgba(250, 204, 21, 0.15);
          color: #facc15;
          border-color: rgba(250, 204, 21, 0.5);
        }

        .chip-critical {
          background: rgba(239, 68, 68, 0.18);
          color: #fecaca;
          border-color: rgba(248, 113, 113, 0.6);
        }

        .actions-cell {
          justify-content: flex-end;
          gap: 8px;
        }

        .btn-chip {
          border-radius: 999px;
          border: 1px solid transparent;
          padding: 4px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          background: transparent;
          color: #e5e7eb;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease, border-color 0.2s ease;
        }

        .btn-chip:hover {
          transform: translateY(-1px);
        }

        .warn-btn {
          border-color: rgba(250, 204, 21, 0.6);
          background: rgba(250, 204, 21, 0.08);
          color: #facc15;
        }

        .warn-btn:hover {
          background: rgba(250, 204, 21, 0.18);
        }

        .remove-btn {
          border-color: rgba(239, 68, 68, 0.7);
          background: rgba(239, 68, 68, 0.08);
          color: #fecaca;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.18);
        }

        @media (max-width: 900px) {
          .live-card {
            width: 100%;
          }
        }

        @media (max-width: 720px) {
          .live-header-row,
          .live-row {
            grid-template-columns: 1.2fr 1.8fr;
            row-gap: 6px;
          }
          .confidence-cell,
          .actions-cell {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveMonitoringTable;
