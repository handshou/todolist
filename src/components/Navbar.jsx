import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/todolist">Todolist</Link>
    </>
  );
}
