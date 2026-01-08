import { useParams } from "react-router-dom";
import { Ws_Hook } from "./socket";
import toast, { Toaster } from "react-hot-toast";


function confidenceColor(score) {
  if (score >= 90) return "#16a34a"; // green
  if (score >= 75) return "#f59e0b"; // yellow
  if (score >= 50) return "#fb7185"; // red-pink
  return "#dc2626";
}

export default function DetailedUserMonitering() {
  const { contestUrl, email } = useParams();
  const decodedContest = decodeURIComponent(contestUrl);
  const decodedEmail = decodeURIComponent(email);

  const { messages } = Ws_Hook(decodedContest);

  if (!messages || messages.length === 0) {
    return <div style={{ color: "#94a3b8", marginTop: "2rem" }}>No data found</div>;
  }

  const user = messages.find((m) => m.email === decodedEmail);
  if (!user || !user.fulldata || user.fulldata.length === 0) {
    return <div style={{ color: "#94a3b8", marginTop: "2rem" }}>No data found</div>;
  }

  const latest = user.fulldata;

  const handleAdminAction = async (action) => {
    console.log(action);
    alert("btn clk")
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/adminaction/?action=${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contesturl: decodedContest,
        email: decodedEmail,
      }),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    toast.success(`${action} sent to ${data.email} for contest ${data.contesturl}`);
    console.log(`${action} response:`, data);
    return data;
  } catch (err) {
    toast.error(`Failed to ${action.toLowerCase()} user: ${err.message}`);
    console.error(err);
  }
};

// Specific functions
const HandleWarning = () => handleAdminAction("WARNING");
const HandleKick = () => handleAdminAction("KICK");

  return (
    <div style={{ padding: 16 }}>
      {/* Header with buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ color: "#e5e7eb" }}>User Timeline: {user.email}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={HandleWarning} style={warnBtn}>Warn</button>
          <button onClick={HandleKick} style={kickBtn}>Kick</button>
        </div>
      </div>

      {/* Full timeline table */}
      <table style={table}>
        <thead>
          <tr>
            {[
              "Email",
              "Contest URL",
              "Status",
              "Final Confidence",
              "Face Missing",
              "Multiple Persons",
              "Phone",
              "Tab Switch",
              "Date / Time"
            ].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {latest.map((entry, idx) => (
            <tr key={idx} style={{ background: "#0f172a" }}>
              <td style={cell}>{entry.email}</td>
              <td style={cell}>{entry.url}</td>
              <td style={cell}>{entry.status}</td>
              <td style={{ ...cell, color: confidenceColor(entry.final_confidence), fontWeight: 700 }}>
                {entry.final_confidence}%
              </td>
              <td style={cell}>{entry.events.face_missing}</td>
              <td style={cell}>{entry.events.multiple_person}</td>
              <td style={cell}>{entry.events.phone}</td>
              <td style={cell}>{entry.events.tab_switch}</td>
              <td style={cell}>{new Date(entry.date_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Styles ---------- */
const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#020617",
  borderRadius: 8,
  overflow: "hidden",
};

const th = {
  textAlign: "left",
  padding: "12px 16px",
  borderBottom: "1px solid #0f172a",
  color: "#94a3b8",
};

const cell = {
  padding: "12px 16px",
  borderBottom: "1px solid #0f172a",
  color: "#e5e7eb",
};

const warnBtn = {
  padding: "8px 16px",
  background: "#f59e0b",
  color: "#020617",
  border: "none",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
};

const kickBtn = {
  padding: "8px 16px",
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
};
