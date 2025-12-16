import React from 'react';

// Data Configuration
const leaders = [
  { name: "Leader", role: "Leader & Architect", img: "https://i.pravatar.cc/300?img=1", isLeader: true },
  { name: "Mentor", role: "Mentor", img: "https://i.pravatar.cc/300?img=5", isLeader: false }
];

const team = [
  { name: "Aman", role: "Operations", img: "https://i.pravatar.cc/150?img=2" },
  { name: "Neha", role: "Backend", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Riya", role: "Frontend", img: "https://i.pravatar.cc/150?img=4" },
  { name: "Kunal", role: "QA", img: "https://i.pravatar.cc/150?img=6" },
  { name: "Sneha", role: "Analyst", img: "https://i.pravatar.cc/150?img=7" }
];

// Double the team list for the infinite scroll effect
const scrollingTeam = [...team, ...team];

export default function ContributorsSection() {
  return (
    <section id="team" style={{ 
      paddingTop: '40px', 
      paddingBottom: '0px', 
      textAlign: 'center', 
      overflow: 'hidden' 
    }}>
      
      {/* Title */}
      <h2 style={{ 
        fontWeight: '800', 
        marginBottom: '40px', 
        color: '#0ea5a4', 
        fontSize: '2.5rem',
        letterSpacing: '1px'
      }}>
        Contributors
      </h2>

      {/* --- TOP SECTION: LEADER & MENTOR --- */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '22px', 
        marginBottom: '10px', 
        flexWrap: 'wrap',
        padding: '0 20px'
      }}>
        {leaders.map((person, index) => (
          <div 
            key={index} 
            // ADDED: "theme-card" class
            className="hover-card theme-card"
            style={{
              // REMOVED: background: 'white' (Now handled in CSS below)
              width: '475px', 
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: person.isLeader 
                ? '0 10px 40px rgba(34, 211, 238, 0.4)' 
                : '0 10px 30px rgba(0,0,0,0.08)',
              border: person.isLeader ? '2px solid rgba(34, 211, 238, 0.3)' : 'none',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, background-color 0.3s ease',
              cursor: 'pointer',
              display: 'flex',       
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={person.img} 
              alt={person.name} 
              style={{ 
                width: '130px', 
                height: '130px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '5px solid #0ea5a4', 
                marginBottom: '10px' 
              }} 
            />
            {/* ADDED: theme-text-primary class */}
            <h3 className="theme-text-primary" style={{ fontWeight: '800', margin: '5px 0', fontSize: '1.6rem' }}>
              {person.name}
            </h3>
            {/* ADDED: theme-text-secondary class */}
            <p className="theme-text-secondary" style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>
              {person.role}
            </p>
          </div>
        ))}
      </div>

      
      {/* --- SCROLLING TEAM SECTION --- */}
      <div className="scroll-container" style={{ marginTop: '0px' }}>
        <div className="scroll-track" style={{ paddingBottom: '30px'  }}>
          {scrollingTeam.map((member, index) => (
            <div 
              key={index} 
              // ADDED: "theme-card" class
              className="contributor-card hover-card theme-card" 
              style={{ 
                display: 'inline-block', 
                margin: '11px', 
                // REMOVED: background: 'white'
                padding: '15px',
                borderRadius: '18px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
                width: '280px', 
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <img 
                src={member.img} 
                alt={member.name} 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '3px solid #0ea5a4',
                  marginBottom: '10px' 
                }} 
              />
               {/* ADDED: theme-text-primary class */}
              <h5 className="theme-text-primary" style={{ fontWeight: '700', margin: '5px 0', fontSize: '1.1rem' }}>
                {member.name}
              </h5>
               {/* ADDED: theme-text-secondary class */}
              <p className="theme-text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* --- DEFAULT (Light Mode) --- */
        .theme-card {
            background-color: white;
        }
        .theme-text-primary {
            color: #1e293b; /* Dark Slate */
        }
        .theme-text-secondary {
            color: #64748b; /* Slate Gray */
        }

        /* --- DARK MODE OVERRIDES --- */
        /* This checks if a parent (like body) has the class 'dark' or 'dark-mode' */
        :global(body.dark) .theme-card,
        :global(body.dark-mode) .theme-card,
        :global(.dark) .theme-card {
            background-color: #1e293b !important; /* Dark Blue Background */
            border: 1px solid #334155;
        }

        :global(body.dark) .theme-text-primary,
        :global(body.dark-mode) .theme-text-primary,
        :global(.dark) .theme-text-primary {
            color: #f1f5f9 !important; /* White Text */
        }

        :global(body.dark) .theme-text-secondary,
        :global(body.dark-mode) .theme-text-secondary,
        :global(.dark) .theme-text-secondary {
            color: #cbd5e1 !important; /* Light Gray Text */
        }

        /* Hover Animation */
        .hover-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 25px 50px rgba(14, 165, 164, 0.25) !important;
        }
      `}</style>

    </section>
  );
}