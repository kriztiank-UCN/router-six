import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Outlet defines where inside the component it should actually appear
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Redirect to /learn if user tries to access /myapps */}
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />

      {/* nested routes is the Outlet */}
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success" to="/learn/courses">
        courses
      </Link>
      <Link className="btn btn-primary" to="/learn/bundles">
        bundles
      </Link>
      {/* nested routes inside Learn are rendered here */}
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["react", "angular", "vue", "svelte"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses list</h1>
      <h4>Courses card</h4>

      <p>More test</p>
      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow",
          };
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/tests`}>
        tests
      </NavLink>
      {/* nested routes inside Courses are rendered here */}
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundle list</h1>
      <h4>Bundle card</h4>
    </div>
  );
}

function CourseId() {
  // Passing state using useNavigate and useLocation
  const navigate = useNavigate();
  const { courseid } = useParams();
  return (
    <div>
      <h1>URL params is: {courseid}</h1>
      <button
        // Passing state using useNavigate and useLocation
        onClick={() => navigate("/dashboard", { state: courseid })}
        className="btn btn-warning"
      >
        Price
      </button>
      {/* Passing state using Link */}
      <Link to="/dashboard" state={'DJANGO'}>Test link</Link>
    </div>
  );
}

function Dashboard() {
  // Passing state using useNavigate and useLocation
  const location = useLocation();
  return (
    <div>
      {/* Passing state using useNavigate and useLocation */}
      <h1>Info that i got here is: {location.state} </h1>
    </div>
  );
}
