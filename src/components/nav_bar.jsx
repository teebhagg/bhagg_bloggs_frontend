import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NavBar() {

  const params = useParams();
  const navigate = useNavigate();

  const checkSigninStatus = async() => {
    try {
      let response = await fetch(`/blogs/users/${params.id}`)
      let data = await response.json()
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/', {replace:'true'})
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      User Account
    </Tooltip>
  );

  if (
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/sign-up"
  ) {
    return (
      <Navbar bg="light" expand="md" sticky="top" >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bolder">
            Bhagg Bloggs
          </Navbar.Brand>

          {/* Menu Icon */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navigators */}
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav">
            <Nav className="d-flex gap-3 align-items-end">
              <Nav.Link as={Link} to='/explore-genres' className="my-auto">Categories</Nav.Link>

              {/* New Post Button */}
              {window.location.pathname !== "/new-post" ? (
                <Nav.Link as={Link} to={`/new-post`} onClick>
                  <Button>Add Post</Button>
                </Nav.Link>
              ) : null}

              {/* Logout */}
              {window.location.pathname === "/user" ? (
                <Nav.Link className='text-danger my-auto' onClick={logout} >
                  Logout
                </Nav.Link>
              ) : null}

              {/* Tooltip */}
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <Nav.Link as={Link} to="/user" className="p-0">
                  <i className="bi bi-person-circle" style={{ fontSize: 35 }}></i>
                </Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
