import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../services/adminService";
import { toast } from "react-toastify";

import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaUserSlash,
  FaTrash,
} from "react-icons/fa";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const USERS_PER_PAGE = 3;

const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  filterUsers();
  setCurrentPage(1);
}, [users, search, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data.users);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (roleFilter !== "All") {
      data = data.filter(
        (user) => user.role === roleFilter
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((user) =>
        statusFilter === "Active"
          ? user.isActive
          : !user.isActive
      );
    }

    setFilteredUsers(data);
  };

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (u) => u.role === "admin"
  ).length;

  const indexOfLastUser =
  currentPage * USERS_PER_PAGE;

const indexOfFirstUser =
  indexOfLastUser - USERS_PER_PAGE;

const currentUsers =
  filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

const totalPages = Math.ceil(
  filteredUsers.length / USERS_PER_PAGE
);

  const totalRegularUsers = users.filter(
    (u) => u.role === "user"
  ).length;

  const suspendedUsers = users.filter(
    (u) => !u.isActive
  ).length;

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);

      toast.success("Role updated.");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update role."
      );
    }
  };

  const handleStatusChange = async (
    id,
    currentStatus
  ) => {
    try {
      await updateUserStatus(
        id,
        !currentStatus
      );

      toast.success("Status updated.");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await deleteUser(id);

    toast.success("User deleted.");

    fetchUsers();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete user."
    );
  }
};

const exportToCSV = () => {
  const headers = [
    "Name",
    "Email",
    "Role",
    "Status",
    "Phone",
    "Location",
    "Joined",
  ];

  const rows = filteredUsers.map((user) => [
    user.name,
    user.email,
    user.role,
    user.isActive ? "Active" : "Suspended",
    user.phone || "",
    user.location || "",
    new Date(user.createdAt).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "users.csv";

  link.click();

  URL.revokeObjectURL(url);
};

return (
  <>
    <Navbar />

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "25px",
          
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "15px",
          }}
        >
          User Management
        </h2>
          <button
            onClick={exportToCSV}
            style={styles.exportButton}
            >
            📥 Export Users (CSV)
            </button>
        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Manage registered users, roles and account status.
        </p>

        {/* Dashboard Cards */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          <DashboardCard
            title="Total Users"
            value={totalUsers}
            color="#2563eb"
            icon={<FaUsers />}
          />

          <DashboardCard
            title="Admins"
            value={totalAdmins}
            color="#16a34a"
            icon={<FaUserShield />}
          />

          <DashboardCard
            title="Users"
            value={totalRegularUsers}
            color="#ea580c"
            icon={<FaUser />}
          />

          <DashboardCard
            title="Suspended"
            value={suspendedUsers}
            color="#dc2626"
            icon={<FaUserSlash />}
          />
        </div>

        {/* Search & Filters */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.input}
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            style={styles.input}
          >
            <option>All</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={styles.input}
          >
            <option>All</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>

        {loading ? (
          <h3>Loading users...</h3>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>Photo</th>
                <th style={styles.header}>Name</th>
                <th style={styles.header}>Email</th>
                <th style={styles.header}>Role</th>
                <th style={styles.header}>Status</th>
                <th style={styles.header}>Resume</th>
                <th style={styles.header}>GitHub</th>
                <th style={styles.header}>LinkedIn</th>
                <th style={styles.header}>Portfolio</th>
                <th style={styles.header}>Actions</th>
                </tr>
            </thead>

           <tbody>
  {currentUsers.map((user) => (
    <tr key={user._id}>
      <td style={styles.cell}>
        {user.profileImage ? (
          <img
            src={`http://localhost:5000${user.profileImage}`}
            alt={user.name}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
           src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
            alt="avatar"
            style={{
              width: "35px",
              height: "45px",
              borderRadius: "50%",
            }}
          />
        )}
      </td>

      <td style={styles.cell}>{user.name}</td>

      <td style={styles.cell}>{user.email}</td>

      <td style={styles.cell}>
        <select
          value={user.role}
          style={styles.select}
          onChange={(e) =>
            handleRoleChange(user._id, e.target.value)
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>

      <td style={styles.cell}>
        <span
          style={{
            background: user.isActive ? "#22c55e" : "#ef4444",
            color: "#fff",
            padding: "3px 6px",
            borderRadius: "20px",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {user.isActive ? "Active" : "Suspended"}
        </span>
      </td>

      <td style={styles.cell}>
        {user.resume ? (
          <a
            href={`http://localhost:5000${user.resume}`}
            target="_blank"
            rel="noreferrer"
          >
            📄 Resume
          </a>
        ) : (
          "-"
        )}
      </td>

      <td style={styles.cell}>
        {user.github ? (
          <a
            href={user.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        ) : (
          "-"
        )}
      </td>

      <td style={styles.cell}>
        {user.linkedin ? (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        ) : (
          "-"
        )}
      </td>

      <td style={styles.cell}>
        {user.portfolio ? (
          <a
            href={user.portfolio}
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        ) : (
          "-"
        )}
      </td>

      <td style={styles.cell}>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            style={{
              ...styles.button,
              background: user.isActive
                ? "#f59e0b"
                : "#22c55e",
            }}
            onClick={() =>
              handleStatusChange(
                user._id,
                user.isActive
              )
            }
          >
            {user.isActive ? "Suspend" : "Activate"}
          </button>

          <button
            style={{
              ...styles.button,
              background: "#ef4444",
            }}
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>

          
        )}
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "25px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    style={{
      ...styles.button,
      background: currentPage === 1 ? "#94a3b8" : "#2563eb",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
    }}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        width: "40px",
        height: "40px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        background:
          currentPage === index + 1
            ? "#2563eb"
            : "#e5e7eb",
        color:
          currentPage === index + 1
            ? "#fff"
            : "#000",
        fontWeight: "bold",
      }}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={{
      ...styles.button,
      background:
        currentPage === totalPages
          ? "#94a3b8"
          : "#2563eb",
      cursor:
        currentPage === totalPages
          ? "not-allowed"
          : "pointer",
    }}
  >
    Next
  </button>
</div>
      </div>

      
    </div>

  </>
);
}

const styles = {
  input: {
    padding: "5px 7px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    minWidth: "100px",
    outline: "none",
    fontSize: "14px",
  },

  table: {
    overflow:"auto",
    width: "80%",
    background: "#fff",
    borderCollapse: "collapse",
    borderRadius: "12px",
    // overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  header: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontWeight: "400",
  },

  cell: {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },

  select: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    background: "#fff",
  },

  button: {
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 7px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "0.2s",
  },
  exportButton: {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
},
};

export default AdminUsers;