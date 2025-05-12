import { NavLink, Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <header style={{
        displey: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        margin: "auto",
        backgroundColor: '#111',
      }}>
        <h1>My Application</h1>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/auth/login">
          Login
        </NavLink>
        <NavLink to="/auth/register">
          Register
        </NavLink>
      </header>
      <main><Outlet /></main>
    </div>
  );
}

export default MainLayout;