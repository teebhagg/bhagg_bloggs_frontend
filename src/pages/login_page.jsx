import React, { useState } from "react";
import { Button, Card, Container, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  
  const validation = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Content must have a minimum of 6 characters");
    }
    if (password.length > 5) {
      logIn();
    }
  };
  
  const logIn = async () => {
    try {
      let response = await fetch("/blogs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      let data = await response.json();
      console.log(data);
      // window.localStorage.setItem('token', data.token);
      // navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "92vh" }}>
      <Card className="container" style={{ maxWidth: "500px" }}>
        <Card.Body className="p-3">
          <Container className="d-flex justify-content-center">
            <i className="bi bi-lock-fill" style={{ fontSize: "30px" }}></i>
          </Container>
          <Form className="d-flex flex-column gap-4" onSubmit={validation} >

              {/* Email Field */}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Field */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p className="d-flex gap-3 align-self-center">
              New User?{" "}
              <Nav.Link href="/sign-up" className="text-decoration-underline">Sign Up</Nav.Link>{" "}
            </p>
            <Button type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
