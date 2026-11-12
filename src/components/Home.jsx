import { Container } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const { logout } = useAuth();
 

 

  return (
    <Container className="d-flex flex-column h-100 overflow-hidden">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center" style={{ height: "60px", flexShrink: 0 }}>
        <h2 className="m-0 fs-4">Home</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

     
    </Container>
  );
}

export default Home;