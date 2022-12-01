import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import MySpinner from "../components/spinner";

export default function FullBlogPost() {
  const [fullPost, setFullPost] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);

  const getBlogPosts = async () => {
    try {
      let response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs/${params.id}`
      );
      let data = await response.json();
      console.log(data);
      setFullPost(data);
    } catch (error) {
      console(error.mesage);
    }
  };

  const deleteBlog = async() => {
    try {
      var response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs/${params.id}`,
        { method:'DELETE'}
      );      
      let data = await response.json();
      console.log(data)
      toast.success('Post Deleted',{position:toast.POSITION.BOTTOM_CENTER});
      navigate(-1)
    } catch (error) {
      console.log(error);
      toast.success(error,{position:toast.POSITION.TOP_CENTER});
    }
  }

  useEffect(() => {
    getBlogPosts();
    console.log(user);
  }, []);
  return fullPost === null ? (
    <MySpinner />
  ) : (
    <Container className="container-md py-4" style={{ maxWidth: 800 }}>
      <h1 className="display-3 border-bottom pb-2">{fullPost.title}</h1>
      <h1 className="text-muted fst-italic py-2 h4">
        Post By {fullPost.author}
      </h1>
      <div
        className="fw-light"
        dangerouslySetInnerHTML={{ __html: fullPost.content }}
      />
      {user !== null ? (
        user.email === fullPost.email ? (
          <div className="d-flex justify-content-end mx-auto">
            <Button className="btn-danger mt-5" onClick={deleteBlog}>Delete Post</Button>
          </div>
        ) : null
      ) : null}
    </Container>
  );
}
