import { Link } from "react-router";

function RegisterPage() {
    async function registerUser(formData) {
      const username = formData.get('username')
      const email = formData.get('email')
      const password = formData.get('password')

      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:username, email:email, password:password }),
        });

        if (response.ok) {
          console.log('User registered successfully');
        } else {
          console.error('Error registering user', await response.text());
        }
      } catch (error) {
        console.error('Network or server error:', error);
      }
    }

    return (
      <div>
        <h1>Register Page</h1>
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
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>

      </div>
    );
  }
  
  export default RegisterPage;