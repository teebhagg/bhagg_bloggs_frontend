import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Container, Form, Nav, Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const headers = new Headers();

  
  const checkSigninStatus = async() => {
    const token = window.localStorage.getItem('token')
    headers.append('Authorization', 'Bearer '+token)
    try {
      let response = await fetch('https://bhagg-bloggs-server.onrender.com/blogs/users/me', {headers: headers})
      console.log('try fetch')
      let data = await response.json()
      navigate(state, {replace: true})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const validation = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("password must have a minimum of 6 characters");
      return;
    }
    // if (password.length > 6) {
    // }
    signUp();
  };

  const signUp = async () => {
    setLoadState(true)
    try {
      let response = await fetch("https://bhagg-bloggs-server.onrender.com/blogs/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:name, email: email, password: password }),
      });
      let data = await response.json();
      console.log(data);
      console.log(data.error);
      if (data.error) {
        if (data.error.startsWith('E11000')) {
          setEmail('');
          setPassword('');
          toast.error('This email already exist', {position:toast.POSITION.BOTTOM_CENTER});
        }
        setLoadState(false);
      } else {
        console.log(data.token);
        toast.success('User created successfully', {position:toast.POSITION.BOTTOM_CENTER})
        window.localStorage.setItem('token', data.token);
        navigate(state, {replace: true})
        setLoadState(false);
      }
    } catch (error) {
      console.log(error, error);
    }
  };

  const navToSignIn = () => {
    navigate("/login", {replace: true, state: state})
  }

  useEffect(()=>{
    checkSigninStatus();
  },[])

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "92vh" }}>
      <Card className="container" style={{ maxWidth: "500px" }}>
        <Card.Body className="p-3">
          <Container className="d-flex justify-content-center">
            <i className="bi bi-lock-fill" style={{ fontSize: "30px" }}></i>
          </Container>
          <Form className="d-flex flex-column gap-4" onSubmit={validation}>
            {/* Name Field */}
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                value={name}
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            {/* Email Field */}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (password.length > 5) {
                    setPasswordError(null);
                  }
                }}
              />

              {passwordError && (
                <p className="text-danger fw-bold m-auto">{passwordError}</p>
              )}
            </Form.Group>
            <p className="d-flex gap-3 align-self-center">
              Already have an account?{" "}
              <p onClick={navToSignIn} style={{ cursor:'pointer' }} className="text-decoration-underline">Log In</p>
            </p>
            <Button type="submit">
              { loadState? <Spinner as="span" animation="border"/>: 'Sign Up'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
