import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function FullBlogPost() {

  const [fullPost, setFullPost] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        let response = await fetch(`/blogs/${params.id}`);
        let data = await response.json();
        console.log(data);
        setFullPost(data)
      } catch (error) {
        console(error.mesage);
      }
    };

    getBlogPosts();
  }, []);
  return (
    <Container className="container-md py-4" style={{ maxWidth:800 }}>
      { fullPost && <h1 className="display-3 border-bottom pb-2">{fullPost.title}</h1>}
      { fullPost && <h1 className="text-muted fst-italic py-2 h4">By Author</h1>}
      { fullPost && <div className="fw-light" dangerouslySetInnerHTML={{__html: fullPost.content}} />}
    </Container>
  );
}

const lorem =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem dicta, omnis eius nulla quod veritatis ex inventore et qui sed dolorem tempore cumque. Ab repellat dignissimos ad eveniet molestiae aspernatur dolores, officia, excepturi quam itaque, est id minima deserunt architecto sequi magni accusantium nobis illo libero alias repudiandae beatae esse.";
