function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>

      <forms>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="example@gmail.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="at least 8 characters" required/>

          <button type="submit">Login</button>
        </forms>
    </div>
  );
}

export default LoginPage;