import React, { useState } from 'react';
import '../styles/Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    if (inputIdentifier === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  
  let postData = {
    query: `query {
      login(email: "${email}", password: "${password}") {
        userId
        token
        tokenExpiration
      }
    }`
  };

  if (!isLogin) {
    postData = {
      query: `mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}) {
          _id
          email
        }
      }`
    };
  }

  const submitHandler = event => {
    event.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;
  
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (response.ok) {
        // login/signup successful
      } else {
        // login/signup failed
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
  <h1>{isLogin ? 'Log in' : 'Sign up'}</h1>
  <form onSubmit={submitHandler}>
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={event => inputChangedHandler(event, 'email')}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={event => inputChangedHandler(event, 'password')}
      />
    </div>
    <div>
      <button type="submit">{isLogin ? 'Log in' : 'Sign up'}</button>
    </div>
  </form>
  <div class="switch-button">
    <button onClick={switchAuthModeHandler}>
      {isLogin ? 'Need an account? Sign up.' : 'Already have an account? Log in.'}
    </button>
  </div>
</div>

  );
};

export default Auth;
