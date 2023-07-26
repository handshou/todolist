import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <div id="App">
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/todolist">Todolist</Link>
        <Outlet />
      </div>
    </>
  );
}
