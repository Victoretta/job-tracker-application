function DashboardLayout({ sidebar, children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "250px",
          flexShrink: 0,
        }}
      >
        {sidebar}
      </div>

      <div
        style={{
          flex: 1,
          padding: "25px",
          overflowX: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;