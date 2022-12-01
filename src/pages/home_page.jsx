import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogPostCard from "../components/blog_post_card";
import MySpinner from "../components/spinner";

export default function HomePage({blogs}) {
  // const blogs = useSelector((state) => state.blogs.blogPosts);
  useEffect(() => {
    console.log(blogs);
  }, []);
  return (
    <Container className="my-3">
      <div className="m-auto pt-4 pb-1" style={{ maxWidth:'800px'}}>
        <h2>Blog Feed</h2>
      </div>
      {blogs == null ? (
        <MySpinner  />
      ) : (
        blogs.map((each) => (
          <BlogPostCard
            key={each._id}
            id={each._id}
            author={each.author}
            title={each.title}
            content={each.content}
          />
        ))
      )}
    </Container>
  );
}
