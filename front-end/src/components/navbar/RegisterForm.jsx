import React, { useState, Fragment, useContext } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap'
import "./RegisterForm.scss"
import { userProvider } from '../contexts/UserProvider'
import { UserContext } from "../contexts/UserContext";
import { useFormFields } from "../hooks/useFormFields";


export default function RegisterForm(props) {

  // const [email, setEmail] = useState(props.email || "");
  // const [password, setPassword] = useState(props.password || "");

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext)


  // function validate() {
  //   if (email === "") {
  //     setError("Enter valid email");
  //     return;
  //   }
  //   if(password === ""){
  //     setError("Enter password");
  //     return;
  //   }
  //   props.onSave(email, password);
  // }

  function registerCheck(event) {
    // event.preventDefault();
    const email = fields.email;
    const password = fields.password;
    let request = {
      email,
      password
    }
    console.log("request", request)
    axios.post('http://localhost:3000/register', request)
      .then(res => {
        const user = res.data[0]
        setUser(user)
        sessionStorage.setItem("user", JSON.stringify(user))
        // console.log("res: ", user)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={`${!props.showRegister ? "register-active" : ""} register-show`}>
      <h2>Register</h2>
      <Form className="registerfrom_style" autoComplete="off" onSubmit={event => event.preventDefault()}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <div >
            <input id="email" type="text" name="email" placeholder="name@email.com"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </div>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div >
            <input id="password" type="password" name="password" placeholder="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm your password</Form.Label>
          <div >
            <input id="confirmPassword" type="password" name="password" placeholder="password"
              value={fields.confirmPassword}
              onChange={handleFieldChange}
            />
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            registerCheck()
            props.setShowRegister(false)
          }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}