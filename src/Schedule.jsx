import React from 'react';

export default function Schedule() {
  // Mock Data for Upcoming Events (Matches the tiles in the image)
  const upcomingEvents = [
    {
      id: 1,
      day: "24",
      month: "OCT",
      title: "Frontend React Assessment",
      time: "10:00 AM",
      duration: "90 mins",
      status: "Open",
      color: "#e0f2fe", // Light blue for date box
      textColor: "#0ea5a4"
    },
    {
      id: 2,
      day: "02",
      month: "NOV",
      title: "Data Structures Round 2",
      time: "02:00 PM",
      duration: "120 mins",
      status: "Upcoming",
      color: "#e0f2fe",
      textColor: "#0ea5a4"
    },
    {
      id: 3,
      day: "15",
      month: "NOV",
      title: "System Design Final",
      time: "11:00 AM",
      duration: "180 mins",
      status: "Locked",
      color: "#f3f4f6", // Grey for locked/far future
      textColor: "#64748b"
    }
  ];

  return (
    <div className="container" style={{ marginTop: '100px', paddingBottom: '50px' }}>
      {/* 1. Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
            <h2 style={{ fontWeight: 'bold', color: '#0f172a' }}>Exam Schedule</h2>
            <p className="text-muted">Browse and register for upcoming contests</p>
        </div>
        {/* Helper text or filter could go here */}
      </div>

      {/* 2. Schedule Tiles (Cards) */}
      <div className="row">
        <div className="col-12">
            {upcomingEvents.map((event) => (
                <div key={event.id} className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px', transition: 'transform 0.2s' }}>
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center flex-wrap">
                            
                            {/* Date Box (The blue square from the image) */}
                            <div className="d-flex flex-column justify-content-center align-items-center me-4" 
                                 style={{ 
                                     backgroundColor: event.color, 
                                     width: '80px', 
                                     height: '80px', 
                                     borderRadius: '15px',
                                     flexShrink: 0
                                 }}>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: event.textColor }}>{event.month}</span>
                                <span style={{ fontSize: '28px', fontWeight: 'bold', color: event.textColor, lineHeight: '1' }}>{event.day}</span>
                            </div>

                            {/* Event Details */}
                            <div className="flex-grow-1 my-2">
                                <h4 className="fw-bold mb-1" style={{ color: '#0f172a' }}>{event.title}</h4>
                                <div className="text-muted d-flex align-items-center">
                                    <i className="fa-regular fa-clock me-2"></i>
                                    <span>{event.time} ({event.duration})</span>
                                    <span className="mx-2">•</span>
                                    <span style={{ 
                                        color: event.status === 'Open' ? '#10b981' : '#64748b', 
                                        fontWeight: '600' 
                                    }}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button (Replaces the Admin Edit/Delete icons) */}
                            <div className="ms-auto mt-3 mt-md-0">
                                {event.status === 'Open' ? (
                                    <button className="btn btn-primary px-4 py-2" 
                                            style={{ 
                                                backgroundColor: '#0ea5a4', 
                                                borderColor: '#0ea5a4', 
                                                borderRadius: '25px',
                                                fontWeight: '600'
                                            }}>
                                        Register Now
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-secondary px-4 py-2" 
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