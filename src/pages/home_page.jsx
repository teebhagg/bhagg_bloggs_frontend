import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogPostCard from "../components/blog_post_card";

export default function HomePage() {
  const blogs = useSelector((state) => state.blogs.blogPosts);
  useEffect(() => {
    console.log(blogs);
  }, []);
  return (
    <Container className="my-3">
      {blogs &&
        blogs.map((each) => (
          <BlogPostCard
            key={each._id}
            id={each._id}
            author={each.author}
            title={each.title}
            content={each.content}
          />
        ))}
    </Container>
  );
}
