import { Link } from "react-router";

function RegisterPage() {
    async function registerUser(formData) {
      const username = formData.get('username')
      const email = formData.get('email')
      const password = formData.get('password')

      fetch('localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      }).then((response) => {
        if (response.ok) {
          console.log('User registered successfully');
        } else {
          console.error('Error registering user');
        }
      })
    }

    return (
      <div>
        <h1>Register Page</h1>
        <p>Please enter your credentials to register.</p>

        <form action={registerUser} method="post">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="example@gmail.com" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required/>
          <label htmlFor="re-password">Repeat Password</label>
          <input type="password" id="re-password" placeholder="Repeat" required/>

          <button type="submit">Register</button>
          <input type="submit" value="Register" />
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    );
  }
  
  export default RegisterPage;