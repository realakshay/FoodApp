import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: 20 }}>
    <h2>Shell App — Home</h2>
    <p>This is the host container. Use the links below to load microfrontends (when available).</p>
    <ul>
      <li><Link to="/auth">Auth (micro-frontend)</Link></li>
      <li><Link to="/restaurants">Restaurants (micro-frontend)</Link></li>
      <li><Link to="/orders">Orders (micro-frontend)</Link></li>
    </ul>
  </div>
);

// Placeholder pages while remotes are not yet implemented
const RemotePlaceholder = ({ name }) => (
  <div style={{ padding: 20 }}>
    <h3>{name}</h3>
    <p>Remote not loaded yet. When the micro-frontend is running, the shell will load it here.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <header style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
          <h1 style={{ margin: 0 }}>FoodApp Shell</h1>
        </header>

        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<RemotePlaceholder name="Auth Microfrontend" />} />
              <Route path="/restaurants" element={<RemotePlaceholder name="Restaurant Microfrontend" />} />
              <Route path="/orders" element={<RemotePlaceholder name="Order Microfrontend" />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
