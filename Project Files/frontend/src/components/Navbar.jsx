import { Link, useNavigate } from "react-router-dom";

function Navbar({darkMode,setDarkMode}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg glass-nav fixed-top">
      <div className="container">

        <Link className="navbar-brand brand-logo" to="/">
          LEARNHUB
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link custom-link" to="/courses">
                Courses
              </Link>
            </li>

            {user?.type === "teacher" && (
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/add-course">
                  Add Course
                </Link>
              </li>
            )}

            {user?.type === "admin" && (
              <li className="nav-item">
                <Link className="nav-link custom-link admin-link" to="/admin">
                  Admin Panel
                </Link>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <Link className="btn btn-warning px-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link user-name">
                    Hello {user.name}
                  </span>
                </li>

                <li className="nav-item ms-2">
                  <button
                    onClick={logout}
                    className="btn btn-warning px-3 fw-bold"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;