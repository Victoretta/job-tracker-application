function DashboardCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "220px",
        boxShadow: "0 3px 10px rgba(0,0,0,.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h5>{title}</h5>

          <h2>{value}</h2>
        </div>

        <div
          style={{
            fontSize: "35px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;