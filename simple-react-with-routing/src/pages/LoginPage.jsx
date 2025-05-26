import { Link } from "react-router";
import { loginUser } from "../scripts/authFunctions";

function LoginPage() {
    return (
      <div>
        <h1>Login Page</h1>
        <p>Please enter your credentials to login.</p>

        <form action={loginUser}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="example@gmail.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required />

          <button type="submit">Register</button>
          <p>Don't have an account yet? <Link to="/auth/register">Register</Link></p>
        </form>

      </div>
    );
  }
  
  export default LoginPage;