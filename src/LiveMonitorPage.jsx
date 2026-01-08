import React from "react";
import { Link, useParams } from "react-router-dom";
import LiveMonitoringTable from "./LiveMonitoringTable";
import { Ws_Hook } from "./socket";
import LiveMonitoringTable2 from "./moniteringtable";

export default function LiveMonitorPage() {
  const { contestUrl } = useParams();
  const decodedUrl = decodeURIComponent(contestUrl);

  const { messages, status, error, disconnect } = Ws_Hook(decodedUrl);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", paddingBottom: "2rem" }}>
      
      {/* 🔴 TOP BAR */}
      <nav
        className="navbar fixed-top shadow-sm"
        style={{ background: "#1e293b", borderBottom: "2px solid #ef4444", zIndex: 1000 }}
      >
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🔴</span>
            <span className="fw-bold text-white" style={{ fontSize: "1.25rem" }}>
              LIVE MONITORING CONSOLE
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span
              className={`badge ${
                status === "CONNECTED"
                  ? "bg-success"
                  : status === "CONNECTING"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {status}
            </span>

            <Link to="/admin-dashboard" className="btn btn-outline-secondary btn-sm rounded-pill fw-bold text-white">
              ← Back
            </Link>
          </div>
        </div>
      </nav>

      {/* 🧠 CONTENT */}
      <div
        className="container-fluid"
        style={{ paddingTop: "110px", display: "flex", justifyContent: "center" }}
      >
        {/* ❌ ERROR STATE */}
        {error && (
          <div className="alert alert-danger w-75 text-center shadow">
            <h5>Connection Error</h5>
            <pre className="text-start small mb-2">
              {JSON.stringify(error, null, 2)}
            </pre>
            <button onClick={disconnect} className="btn btn-outline-danger btn-sm">
              Disconnect
            </button>
          </div>
        )}

        {/* ⏳ LOADING */}
        {!error && status === "CONNECTING" && (
          <div className="text-white text-center">
            <div className="spinner-border text-danger mb-3" />
            <p>Connecting to live stream…</p>
          </div>
        )}

        {/* 📭 EMPTY */}
        {!error && status === "CONNECTED" && messages.length === 0 && (
          <div className="alert alert-secondary text-center w-50">
            Waiting for live data…
          </div>
        )}

        {/* 📋 TABLE */}
        {!error && messages.length > 0 && (
          <LiveMonitoringTable2 data={messages} />
        )}
      </div>
    </div>
  );
}
