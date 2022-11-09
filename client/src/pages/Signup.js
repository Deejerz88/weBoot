import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const wrapperStyle = {
    padding: '20px',
    width: '40%',
    backgroundColor: '#18355B',
    color: 'white',
    borderRadius: '25px',
  };
  const titleStyle = {
    fontSize: '24px',
    fontWeight: '300',
  };
  const formStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  const inputStyle = {
    flex: '1',
    minWidth: '40%',
    margin: '20px 10px 0px 0px',
    padding: '10px',
    borderRadius: '10px',
  };
  const pStyle = {
    fontSize: '12px',
    margin: '20px 10px 0px 0px',
    padding: '10px',
  };
  const buttonStyle = {
    width: '40%',
    border: 'none',
    padding: '15px 20px',
    backgroundColor: 'teal',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '10px',
  };

  return (
    < div classname="container" style={containerStyle} >
      <div classname="wrapper" style={wrapperStyle}>
        <div className="title" style={titleStyle}>
          {' '}
          CREATE AN ACCOUNT
        </div>
        <form style={formStyle} onSubmit={handleFormSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            type="firstName"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            placeholder="******"
            name="password"
            type="password"
            onChange={handleChange}
            style={inputStyle}
          />
          <p style={pStyle}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </p>
          <button style={buttonStyle}>CREATE</button>
        </form>
      </div>
    </div >
  );
}

export default Signup;
