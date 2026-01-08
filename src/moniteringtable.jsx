import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function getConfidenceColor(score) {
  if (score >= 90) return "#064e3b";
  if (score >= 75) return "#78350f";
  if (score >= 50) return "#7c2d12";
  return "#7f1d1d";
}

export default function LiveMonitoringTable2({ data }) {
  const navigate = useNavigate();
  const { contestUrl } = useParams(); // encoded in route
  const decodedContestUrl = decodeURIComponent(contestUrl);


  if (!data || data.length === 0) {
    return (
      <div style={{ color: "#94a3b8", marginTop: "2rem" }}>
        No live data available
      </div>
    );
  }


  

  const handleView = (email) => {
      console.log(`/live-monitor/${encodeURIComponent(decodedContestUrl)}/${encodeURIComponent(email)}`);
    navigate(
      `/live-monitor/${encodeURIComponent(decodedContestUrl)}/${encodeURIComponent(email)}`
    );
  };

  return (
    <div style={container}>
      <table style={table}>
        <thead>
          <tr>
            {[
              "Email",
              "URL",
              "Confidence",
              "Face Missing",
              "Multiple Person",
              "Phone",
              "Tab Switch",
              "Status",
              "Time",
              "Action"
            ].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const e = row.lastelem;

            return (
              <tr
                key={row.email}
                style={{
                  background: getConfidenceColor(e.final_confidence),
                }}
              >
                <td style={cell}>{row.email}</td>
                <td style={cell}>{e.url}</td>
                <td style={cell}><strong>{e.final_confidence}%</strong></td>
                <td style={cell}>{e.events.face_missing}</td>
                <td style={cell}>{e.events.multiple_person}</td>
                <td style={cell}>{e.events.phone}</td>
                <td style={cell}>{e.events.tab_switch}</td>
                <td style={cell}>{e.status}</td>
                <td style={cell}>
                  {new Date(e.date_time).toLocaleTimeString()}
                </td>
                <td style={cell}>
                  <button
                    style={btn}
                    onClick={() => handleView(row.email)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


const container = {
  width: "95%",
  background: "#020617",
  borderRadius: "12px",
  overflow: "hidden",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  color: "#e5e7eb",
  fontSize: "14px",
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #1e293b",
  color: "#cbd5f5",
};

const cell = {
  padding: "12px",
  borderBottom: "1px solid #020617",
};

const btn = {
  padding: "6px 12px",
  borderRadius: "8px",
  background: "#020617",
  color: "#e5e7eb",
  border: "1px solid #334155",
  cursor: "pointer",
};
