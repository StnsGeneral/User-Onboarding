import React from 'react';

export default function Users({ details }) {
  if (!details) return <h3>We are getting the information together soon.</h3>;

  return (
    <div className="user container">
      <h2>
        {details.first_name} {details.last_name}
      </h2>
      <p>Email: {details.email}</p>
    </div>
  );
}
