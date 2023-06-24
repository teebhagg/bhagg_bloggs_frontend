import React from "react";
import { Container, Spinner } from "react-bootstrap";
import BlogPostCard from "../components/blog_post_card";
import CardSkeleton from "../components/card_skeleton";

export default function HomePage({ blogs, isLoading, moreData }) {
  // const blogs = useSelector((state) => state.blogs.blogPosts);
  // useEffect(() => {
  //   console.log(blogs);
  // }, [blogs]);
  return (
    <Container id="scroll-container" className="mt-3 mb-5">
      <div className="m-auto pt-4 pb-1" style={{ maxWidth: "800px" }}>
        <h2>Blog Feed</h2>
      </div>
      {blogs.length < 1 ? (
        <div>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
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
      {blogs.length > 1 && isLoading && moreData ? (
        <div className="mx-auto d-flex justify-content-center" style={{ maxWidth: "800px" }} >
          <Spinner className="mx-auto my-4" animation="grow" />
        </div>
      ) : null}
    </Container>
  );
}
