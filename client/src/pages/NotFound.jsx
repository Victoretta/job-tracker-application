import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you are looking for doesn't exist.</p>

      <Link
        to="/login"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Back to Login
      </Link>
    </div>
  );
}

export default NotFound;