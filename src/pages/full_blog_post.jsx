import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MySpinner from "../components/spinner";

export default function FullBlogPost() {
  const [fullPost, setFullPost] = useState(null);

  const params = useParams();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
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
            <Button className="btn-danger">Delete Post</Button>
          </div>
        ) : null
      ) : null}
    </Container>
  );
}
