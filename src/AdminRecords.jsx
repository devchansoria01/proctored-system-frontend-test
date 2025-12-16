import React from 'react';

export default function AdminRecords() {
  // --- ADMIN-SPECIFIC MOCK DATA ---
  const contests = [
    {
      id: 1,
      date: "Oct 12, 2025",
      name: "Q4 Coding Challenge",
      platform: "Internal Platform",
      winner: "Admin_Test_01",
      duration: "180 Mins",
      status: "Completed",
    },
    {
      id: 2,
      date: "Sep 28, 2025",
      name: "React.js Fundamentals",
      platform: "HackerRank",
      winner: "Admin_Test_02",
      duration: "90 Mins",
      status: "Completed",
    },
    {
      id: 3,
      date: "Aug 15, 2025",
      name: "AWS Certification Prep",
      platform: "Custom Lab",
      winner: "Admin_Test_03",
      duration: "150 Mins",
      status: "Completed",
    },
  ];

  return (
    <div className="container" style={{ marginTop: '30px', paddingBottom: '50px' }}>
      {/* 1. Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="theme-text-primary" style={{ fontWeight: 'bold' }}>Contest Records</h2>
          <p className="text-muted theme-text-secondary">History and performance analytics for your Organization</p>
        </div>
      </div>

      {/* 2. Stats Cards - NOW CORRECTLY SCOPED TO ADMIN DATA */}
      <div className="row mb-5">
        
        {/* STAT CARD 1: CONTESTS ORGANIZED */}
        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                <i className="fa-solid fa-trophy" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">3</h3> {/* CORRECTED: Admin total contests */}
                <small className="text-muted theme-text-secondary">Contests Organized</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* STAT CARD 2: TOTAL PARTICIPANTS */}
        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                <i className="fa-solid fa-users" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">135</h3> {/* CORRECTED: Admin total participants */}
                <small className="text-muted theme-text-secondary">Total Participants</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* STAT CARD 3: AVG. CONFIDENCE */}
        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                <i className="fa-solid fa-bolt" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">94%</h3> {/* CORRECTED: Admin avg confidence */}
                <small className="text-muted theme-text-secondary">Avg. Confidence</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Past Contests Table */}
      <div className="card theme-card p-4" style={{ borderRadius: '20px' }}>
        <h4 className="mb-4 fw-bold theme-text-primary">Past Contests</h4>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light table-themed-head">
              <tr>
                <th scope="col" className="text-uppercase text-muted small">Date</th>
                <th scope="col" className="text-uppercase text-muted small">Contest Name</th>
                <th scope="col" className="text-uppercase text-muted small">Top Performer</th>
                <th scope="col" className="text-uppercase text-muted small">Duration</th>
                <th scope="col" className="text-uppercase text-muted small">Status</th>
                <th scope="col" className="text-uppercase text-muted small">Action</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id} className="table-themed-row">
                  <td className="fw-bold theme-text-primary">{contest.date}</td>
                  <td>
                    <div className="fw-bold theme-text-primary">{contest.name}</div>
                    <small className="text-muted theme-text-secondary">{contest.platform}</small>
                  </td>
                  <td>
                    <span className="badge bg-warning text-dark px-3 py-2 table-themed-badge" style={{ borderRadius: '20px' }}>
                      👑 {contest.winner}
                    </span>
                  </td>
                  <td className="fw-bold theme-text-primary">{contest.duration}</td>
                  <td>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>• {contest.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm table-themed-button" style={{ borderRadius: '10px' }}>
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}