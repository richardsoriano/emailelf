import React from "react";
const Landing = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <h1 align="center">Emaily</h1>
      <h2 align="center">Collect feedback from your users.</h2>

      <ol>
        <li>
          <b>Login</b> Using your Google account.
        </li>
        <li>
          <b>Add Credit</b> Use credit card='4242424242' and any valid future
          date and fake test data for the rest.
        </li>{" "}
        <li>
          <b>Create a Survey</b> Fill out the survey form which all fields are
          required. Any email(s) separated by a comma.
        </li>
        <li>
          <b>Email and Poll</b> The user will receive an email where the user
          can select an answer. The answer is recorded and totaled on the Survey
          Landing Page.
        </li>
        <li>
          <b>NodeJS</b> A fullstack web application with NodeJS, React, Redux,
          Express, and MongoDB and deployed on Heroku .
        </li>
      </ol>
    </div>
  );
};

export default Landing;
