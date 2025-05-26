import { Link } from "react-router";
import { registerUser } from "../scripts/authFunctions";

function RegisterPage() {
    return (
      <div>
        <h1 className="bg-red-500 rounded-xl ">Register Page</h1>
        <p>Please enter your credentials to register.</p>

        <form action={registerUser}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="example@gmail.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required />

          <label htmlFor="re-password">Repeat Password</label>
          <input type="password" id="re-password" name="re-password" placeholder="Repeat" required />

          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/auth/login">Login</Link></p>
        </form>

      </div>
    );
  }
  
  export default RegisterPage;