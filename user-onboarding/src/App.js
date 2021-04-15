import './App.css';
import Form from './Form';
import * as yup from 'yup';
import schema from './validation/formSchema';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Users from './users';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false,
};

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: false,
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // const getUsers = () => {
  //   axios
  //     .get(`https://reqres.in/api/users`)
  //     .then((response) => {
  //       setUsers(response.data);
  //       console.log(setUsers);
  //     })
  //     .catch((err) => {
  //       debugger;
  //     });
  // };

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    };
    postNewUser(newUser);
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ' ',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const postNewUser = (newUser) => {
    axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormValues(initialFormValues);
        console.log(setUsers);
      })
      .catch((err) => {
        setFormValues(initialFormValues);
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <header>
        <h1>User-Onboarding Application</h1>
      </header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map((user) => {
        return <Users key={user.first_name} details={user} />;
      })}
    </div>
  );
}

export default App;
