import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../redux/userReducer";

export default function NewPostPage() {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null);
  const [email, setEmail] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const navigate = useNavigate();
  const params = useParams()
  const user = useSelector(state => state.user.userDetails)
  const dispatch = useDispatch();

  var results;

  const headers = new Headers();

  // Create Blogs
  const createBlog = async () => {
    try {
      let response = await fetch("https://bhagg-bloggs-server.onrender.com/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  title: title, author: author, email: email, content: content }),
      });
      let data = await response.json();
      console.log(data);
      results = data;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Validator
  const validation = (e) => {
    e.preventDefault();
    if (title.length < 20) {
      setTitleError("Title must have a minimum 20 Characters!");
    }
    if (content.length < 1000) {
      setContentError("Content must have a minimum of 1000 characters");
    }
    if (title.length > 20 && content.length > 1000) {
      createBlog();
    }
  };

  // Rich Text Editor Modules
  const  modules  = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ['clean'],     
    ],
};

  // Check if user is Loggedin
  const checkSigninStatus = async() => {
    const token = window.localStorage.getItem('token')
    headers.append('Authorization', 'Bearer '+token)
    if (!token) {
      navigate('/login');
    }
    try {
      let response = await fetch('https://bhagg-bloggs-server.onrender.com/blogs/users/me', {headers: headers})
      console.log('try fetch')
      let data = await response.json()
      console.log(data)
      setAuthor(data.name)
      setEmail(data.email)
      // dispatch(getUser(data))
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
  }

  useEffect(() => {
    checkSigninStatus();

  }, []);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "92vh" }}>
      <Card className="container" style={{ maxWidth: "800" }}>
        <Card.Body className="p-3">
          <Card.Title className="display-6 fw-bold py-3">New Blog</Card.Title>
          <Form className="d-flex flex-column gap-4" onSubmit={validation}>
            {/* Blog Title */}
            <Form.Group>
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Blog Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (title.length > 20) {
                    setTitleError(null);
                  }
                }}
              />
            </Form.Group>

            {titleError && (
              <p className="text-danger fw-bold m-auto">{titleError}</p>
            )}

            {/* Blog Content */}
            <Form.Group>
              <div id="editor-wrapper" className="border mb-5"  >
                <ReactQuill id="editor-container" modules={modules} placeholder="Blog Content" 
                  onChange={(e) => {
                    setContent(e);
                    if (content.length > 1000) {
                      // console.log(content)
                      setContentError(null);
                    }
                  }} />
              </div>
            </Form.Group>

            {contentError && (
              <p className="text-danger fw-bold m-auto">{contentError}</p>
            )}

            {/* Submit Button */}
            <Button type="submit">Publish</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
