import { useDarkMode } from "../Context/DarkModeContext";

function ReadMe() {
  const { darkMode } = useDarkMode();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: darkMode ? "#f0f0f0" : "#333",
  };

  const paragraphStyle = {
    fontSize: "1.1rem",
    maxWidth: "800px",
    lineHeight: "1.6",
    textAlign: "justify",
    backgroundColor: darkMode ? "#2a2a2a" : "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: darkMode
      ? "0 2px 8px rgba(0, 0, 0, 0.6)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        📖 ReadMe Component
      </h1>
      <p style={paragraphStyle}>
        [Note: Always keep running the "Backend Server" to see data in
        "Frontend"]
      </p>
      <p style={paragraphStyle}>
        You can do registration to log in or use the test data to log in.
      </p>
      <p style={paragraphStyle}>
        If you are viewer than you will only able to see the Dashboard and Read
        me page.
      </p>
      <p style={paragraphStyle}>
        If You are Admin or Sales Representative you will able to see the users.
      </p>
      <p style={paragraphStyle}>
        Sales Representative can see and filter the customer But can not add,
        edit or delete any customer data.
      </p>
      <p style={paragraphStyle}>
        Admin can add. edit, delete the customer data.
      </p>
    </div>
  );
}

export default ReadMe;
