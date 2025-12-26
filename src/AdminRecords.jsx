import React from 'react';

export default function AdminRecords() {
  const contests = [
    { id: 1, date: "Oct 12, 2025", name: "Q4 Coding Challenge", platform: "Internal Platform", winner: "Admin_Test_01", duration: "180 Mins", status: "Completed" },
    { id: 2, date: "Sep 28, 2025", name: "React.js Fundamentals", platform: "HackerRank", winner: "Admin_Test_02", duration: "90 Mins", status: "Completed" },
    { id: 3, date: "Aug 15, 2025", name: "AWS Certification Prep", platform: "Custom Lab", winner: "Admin_Test_03", duration: "150 Mins", status: "Completed" },
  ];

  return (
    <div className="container" style={{ marginTop: '30px', paddingBottom: '50px' }}>
      {/* 1. Header Section */}
      <div className="mb-4">
          <h2 className="theme-text-primary fw-bold">Contest Records</h2>
          <p className="theme-text-secondary opacity-75">History and performance analytics for your Organization</p>
      </div>

      {/* 2. Stats Cards */}
      <div className="row mb-5">
        {[
          { icon: 'fa-trophy', count: '3', label: 'Contests Organized' },
          { icon: 'fa-users', count: '135', label: 'Total Participants' },
          { icon: 'fa-bolt', count: '94%', label: 'Avg. Confidence' }
        ].map((stat, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="card theme-card p-3" style={{ borderRadius: '15px', border: 'none' }}>
              <div className="d-flex align-items-center">
                <div className="teal-icon-box me-3">
                  <i className={`fa-solid ${stat.icon} teal-text`}></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold theme-text-primary">{stat.count}</h3>
                  <small className="theme-text-secondary">{stat.label}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Past Contests Table */}
      <div className="card theme-card p-4" style={{ borderRadius: '20px', border: 'none' }}>
        <h4 className="mb-4 fw-bold theme-text-primary">Past Contests</h4>
        <div className="table-responsive">
          <table className="table teal-portal-table align-middle">
            <thead className="table-themed-head">
              <tr>
                <th className="small">DATE</th>
                <th className="small">CONTEST NAME</th>
                <th className="small">TOP PERFORMER</th>
                <th className="small">DURATION</th>
                <th className="small">STATUS</th>
                <th className="small">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id} className="table-themed-row">
                  <td className="fw-bold theme-text-strong">{contest.date}</td>
                  <td>
                    <div className="fw-bold theme-text-primary">{contest.name}</div>
                    <small className="theme-text-secondary opacity-75">{contest.platform}</small>
                  </td>
                  <td>
                    <span className="badge bg-teal-soft px-3 py-2">
                      👑 {contest.winner}
                    </span>
                  </td>
                  <td className="fw-bold theme-text-strong">{contest.duration}</td>
                  <td>
                    <span className="status-indicator-completed">• {contest.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-teal-outline btn-sm">View Report</button>
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