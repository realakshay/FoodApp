import React, { useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'} Page</h1>

      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        {!isLogin && <input type="text" placeholder="Full Name" />}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p>
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here' : 'Login here'}
        </span>
      </p>
    </div>
  );
};

export default App;
