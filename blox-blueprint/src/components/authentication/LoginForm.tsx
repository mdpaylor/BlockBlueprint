function LoginForm() {
  return (
    <div className="auth-form">
      <h2 id="auth-title">Welcome Back</h2>
      <p>Log in to continue to BloxBlueprint.</p>

      <form>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        <button className="button button-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
