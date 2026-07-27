function StatusBadge({ status }) {
  let bgColor = "#6c757d";

  switch (status) {
    case "Available":
      bgColor = "#198754";
      break;

    case "Coming Soon":
      bgColor = "#ffc107";
      break;

    case "Closed":
      bgColor = "#dc3545";
      break;

    case "Applied":
      bgColor = "#0d6efd";
      break;

    case "Under Review":
      bgColor = "#fd7e14";
      break;

    case "Shortlisted":
      bgColor = "#6f42c1";
      break;

    case "Interview":
      bgColor = "#20c997";
      break;

    case "Rejected":
      bgColor = "#dc3545";
      break;

    case "Hired":
      bgColor = "#198754";
      break;

    default:
      bgColor = "#6c757d";
  }

  return (
    <span
      style={{
        background: bgColor,
        color: "white",
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;