import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Container, Form, Nav, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showToast, setSHowToast] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  const [loadState, setLoadState] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const headers = new Headers();

  
  const validation = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Content must have a minimum of 6 characters");
      toast.error(passwordError, {position:toast.POSITION.BOTTOM_CENTER})
    }
    if (password.length > 5) {
      logIn();
    }
  };

  const checkSigninStatus = async() => {
    const token = window.localStorage.getItem('token')
    headers.append('Authorization', 'Bearer '+token)
    try {
      let response = await fetch('https://bhagg-bloggs-server.onrender.com/blogs/users/me', {headers: headers})
      let data = await response.json()
      navigate(state, {replace:true})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const logIn = async () => {
    try {
      setLoadState(true);
      let response = await fetch("https://bhagg-bloggs-server.onrender.com/blogs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      let data = await response.json();
      console.log(data);
      if(data.token){
        window.localStorage.setItem('token', data.token);
        toast.success('Successfully logged in', {position:toast.POSITION.BOTTOM_CENTER});
        navigate(state, {replace:true});
      }
      if (data.error) {
        console.log(data.error)
        if (data.error === 'Incorrect Password') {
          toast.error(data.error, {position:'bottom-center',});
          setPassword('');
          setLoadState(false)
        } else {
          setPassword('');
          setEmail('');
          toast.error(data.error, {position:'bottom-center', });
          setLoadState(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navToSignUp = () => {
    navigate("/sign-up", {replace: true, state: state})
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
          <Form className="d-flex flex-column gap-4" onSubmit={validation} >

              {/* Email Field */}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
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
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p className="d-flex gap-3 align-self-center">
              New User?{" "}
              <p onClick={navToSignUp} style={{ cursor:'pointer' }} className="text-decoration-underline">Sign Up</p>
            </p>
            <Button type="submit">
              { loadState? <Spinner as="span" animation="border"/>: 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
