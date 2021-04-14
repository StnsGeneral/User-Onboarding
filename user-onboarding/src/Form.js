import React from 'react';

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="submit">
        <h2>Add a user</h2>
        <button disabled={disabled}>Submit</button>

        <div className="errors">
          <div>{errors.first_name}</div>
          <div>{errors.last_name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>

        <div className="inputs">
          <h4>General Information</h4>
          <label>
            First Name:
            <input
              name="first_name"
              value={values.first_name}
              type="text"
              onChange={onChange}
            />
          </label>
          <label>
            Last Name:
            <input
              name="last_name"
              value={values.last_name}
              type="text"
              onChange={onChange}
            />
          </label>
          <label>
            Email:
            <input
              value={values.email}
              onChange={onChange}
              name="email"
              type="text"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
            />
          </label>
          <label>
            Terms and Conditions
            <input
              type="checkbox"
              checked={values.terms}
              onChange={onChange}
              name="terms"
            />
          </label>
        </div>
      </div>
    </form>
  );
}
