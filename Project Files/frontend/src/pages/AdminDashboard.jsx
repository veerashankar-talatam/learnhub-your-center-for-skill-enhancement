import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setStats(res.data);
    } catch {
      alert("Access Denied");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(res.data);
    } catch {
      alert("Access Denied");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchUsers();
    fetchDashboard();
  };

  if (!stats) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4 fw-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Users</h5>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Students</h5>
            <h3>{stats.totalStudents}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Teachers</h5>
            <h3>{stats.totalTeachers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Total Courses</h5>
            <h3>{stats.totalCourses}</h3>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u._id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminDashboard;