import React, { useState } from 'react';
import axioswal from 'axioswal';
import Layout from '../components/layout';
import redirectTo from '../lib/redirectTo';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axioswal
      .post('/api/users', {
        name,
        email,
        password,
      })
      .then((data) => {
        console.log(data)
        if (data.status === 'ok') {
          redirectTo('/');
        }
      })

  };

  return (
    <Layout>
      <div style={{ margin: '4rem' }}>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            Sign up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignupPage;