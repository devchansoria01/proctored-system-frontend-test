import React from 'react';

export default function Records() {
  // Mock Data (matches the image)
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
      winner: "Dev_Sarah",
      duration: "90 Mins",
      status: "Completed",
    },
  ];

  return (
    <div className="container" style={{ marginTop: '100px', paddingBottom: '50px' }}>
      {/* 1. Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 style={{ fontWeight: 'bold', color: '#0f172a' }}>Contest Records</h2>
            <p className="text-muted">History and performance analytics</p>
        </div>
        {/* Dark Mode button is already in your Navbar, so we skip it here to avoid duplicates */}
      </div>

      {/* 2. Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 mb-3" style={{ borderRadius: '15px' }}>
                <div className="d-flex align-items-center">
                    <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                        <i className="fa-solid fa-trophy" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
                    </div>
                    <div>
                        <h3 className="mb-0 fw-bold">24</h3>
                        <small className="text-muted">Contests Organized</small>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 mb-3" style={{ borderRadius: '15px' }}>
                <div className="d-flex align-items-center">
                    <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                        <i className="fa-solid fa-users" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
                    </div>
                    <div>
                        <h3 className="mb-0 fw-bold">1,204</h3>
                        <small className="text-muted">Total Participants</small>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 mb-3" style={{ borderRadius: '15px' }}>
                <div className="d-flex align-items-center">
                    <div style={{ backgroundColor: '#e0f2fe', padding: '15px', borderRadius: '12px', marginRight: '15px' }}>
                        <i className="fa-solid fa-bolt" style={{ color: '#0ea5a4', fontSize: '24px' }}></i>
                    </div>
                    <div>
                        <h3 className="mb-0 fw-bold">89%</h3>
                        <small className="text-muted">Avg. Confidence</small>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Past Contests Table */}
      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>
        <h4 className="mb-4 fw-bold">Past Contests</h4>
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead className="table-light">
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
                        <tr key={contest.id}>
                            <td className="fw-bold">{contest.date}</td>
                            <td>
                                <div className="fw-bold">{contest.name}</div>
                                <small className="text-muted">{contest.platform}</small>
                            </td>
                            <td>
                                <span className="badge bg-warning text-dark px-3 py-2" style={{ borderRadius: '20px' }}>
                                    👑 {contest.winner}
                                </span>
                            </td>
                            <td className="fw-bold">{contest.duration}</td>
                            <td>
                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>• {contest.status}</span>
                            </td>
                            <td>
                                <button className="btn btn-outline-secondary btn-sm" style={{ borderRadius: '10px' }}>
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