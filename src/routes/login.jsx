import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <div>
        <form id="search-form" role="search">
          <input
            id="username"
            placeholder="username"
            type="text"
            name="username"
          />
          <input
            id="password"
            placeholder="password"
            type="password"
            name="password"
          />
        </form>
        <form>
          <Link to="/todolist">Register</Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
