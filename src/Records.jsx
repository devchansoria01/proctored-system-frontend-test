import React from 'react';

export default function Records() {
  const contests = [
    {
      id: 1,
      date: "Oct 12, 2025",
      name: "Dynamic Programming Hard",
      platform: "HackerRank",
      winner: "User_892",
      duration: "180 Mins",
      status: "Completed",
    },
    {
      id: 2,
      date: "Sep 28, 2025",
      name: "React.js Fundamentals",
      platform: "Internal Platform",
      winner: "candidate198",
      duration: "90 Mins",
      status: "Completed",
    },
  ];

  return (
    <div className="container" style={{ marginTop: '20px', paddingBottom: '50px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="theme-text-primary" style={{ fontWeight: 'bold' }}>
            Contest Records
          </h2>
          <p className="text-muted theme-text-secondary">
            History and performance analytics
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: '#e0f2fe',
                  padding: '15px',
                  borderRadius: '12px',
                  marginRight: '15px',
                }}
              >
                <i
                  className="fa-solid fa-trophy"
                  style={{ color: '#0ea5a4', fontSize: '24px' }}
                ></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">24</h3>
                <small className="text-muted theme-text-secondary">
                  Contests Organized
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: '#e0f2fe',
                  padding: '15px',
                  borderRadius: '12px',
                  marginRight: '15px',
                }}
              >
                <i
                  className="fa-solid fa-users"
                  style={{ color: '#0ea5a4', fontSize: '24px' }}
                ></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">1,204</h3>
                <small className="text-muted theme-text-secondary">
                  Total Participants
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card theme-card p-3 mb-3" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: '#e0f2fe',
                  padding: '15px',
                  borderRadius: '12px',
                  marginRight: '15px',
                }}
              >
                <i
                  className="fa-solid fa-bolt"
                  style={{ color: '#0ea5a4', fontSize: '24px' }}
                ></i>
              </div>
              <div>
                <h3 className="mb-0 fw-bold theme-text-primary">89%</h3>
                <small className="text-muted theme-text-secondary">
                  Avg. Confidence
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {/* Stronger color for date */}
                  <td className="fw-bold theme-text-strong">{contest.date}</td>

                  <td>
                    <div className="fw-bold theme-text-primary">{contest.name}</div>
                    <small className="text-muted theme-text-secondary">
                      {contest.platform}
                    </small>
                  </td>

                  <td>
                    <span
                      className="badge bg-warning text-dark px-3 py-2 table-themed-badge"
                      style={{ borderRadius: '20px' }}
                    >
                      👑 {contest.winner}
                    </span>
                  </td>

                  {/* Stronger color for duration */}
                  <td className="fw-bold theme-text-strong">{contest.duration}</td>

                  <td>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                      • {contest.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm table-themed-button"
                      style={{ borderRadius: '10px' }}
                    >
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
