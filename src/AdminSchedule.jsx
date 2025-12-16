import React from 'react';

export default function AdminSchedule() {
  // --- ADMIN-SPECIFIC MOCK DATA (Contests scheduled by this admin) ---
  const upcomingEvents = [
    {
      id: 1,
      day: "24",
      month: "OCT",
      title: "Frontend React Assessment",
      time: "10:00 AM",
      duration: "90 mins",
      status: "Open",
    },
    {
      id: 2,
      day: "15",
      month: "NOV",
      title: "System Design Final",
      time: "11:00 AM",
      duration: "180 mins",
      status: "Locked",
    },
    {
      id: 3,
      day: "03",
      month: "DEC",
      title: "Database Optimization Drill",
      time: "03:00 PM",
      duration: "60 mins",
      status: "Upcoming",
    }
  ];

  return (
    // FIX: Reduced marginTop for proper dashboard fit
    <div className="container" style={{ marginTop: '30px', paddingBottom: '50px' }}>
      {/* 1. Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          {/* Theme classes added */}
          <h2 className="theme-text-primary" style={{ fontWeight: 'bold' }}>Your Exam Schedule</h2>
          <p className="text-muted theme-text-secondary">Contests scheduled by your Organization</p>
        </div>
      </div>

      {/* 2. Schedule Tiles (Cards) */}
      <div className="row">
        <div className="col-12">
            {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="card theme-card shadow-sm mb-4" 
                  style={{ borderRadius: '15px', transition: 'transform 0.2s' }}
                >
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center flex-wrap">
                            
                            {/* Date Box */}
                            <div className="d-flex flex-column justify-content-center align-items-center me-4 schedule-date-box" 
                                data-status={event.status} 
                                style={{ 
                                    width: '80px', 
                                    height: '80px', 
                                    borderRadius: '15px',
                                    flexShrink: 0
                                }}>
                                <span className="schedule-date-month">{event.month}</span>
                                <span className="schedule-date-day">{event.day}</span>
                            </div>

                            {/* Event Details */}
                            <div className="flex-grow-1 my-2">
                                <h4 className="fw-bold mb-1 theme-text-primary">{event.title}</h4>
                                <div className="text-muted d-flex align-items-center schedule-text theme-text-secondary">
                                    <i className="fa-regular fa-clock me-2"></i>
                                    <span>{event.time} ({event.duration})</span>
                                    <span className="mx-2">•</span>
                                    <span className={`schedule-status-${event.status.toLowerCase()}`}
                                        style={{ fontWeight: '600', color: event.status === 'Open' ? '#10b981' : '#64748b' }}
                                    >
                                        {event.status}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="ms-auto mt-3 mt-md-0">
                                {event.status === 'Open' ? (
                                    <button className="btn btn-primary px-4 py-2 schedule-button-primary" 
                                          style={{ 
                                              backgroundColor: '#0ea5a4', 
                                              borderColor: '#0ea5a4', 
                                              borderRadius: '25px',
                                              fontWeight: '600'
                                          }}>
                                        Register Now
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-secondary px-4 py-2 schedule-button-secondary" 
                                          disabled
                                          style={{ borderRadius: '25px' }}>
                                        Notify Me
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}