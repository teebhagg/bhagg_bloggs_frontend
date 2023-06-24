import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModal from "../components/custom_modal";
import MySpinner from "../components/spinner";
import PostSkeleton from "../components/post_skeleton";

export default function FullBlogPost() {
  const [fullPost, setFullPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);

  const getBlogPost = async () => {
    try {
      let response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs/${params.id}`
      );
      let data = await response.json();
      // console.log(data);
      setFullPost(data);
      console.log(data)
      setLikeCount(data.likes.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBlog = async () => {
    try {
      var response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs/${params.id}`,
        { method: "DELETE" }
      );
      let data = await response.json();
      console.log(data);
      toast.success("Post Deleted", { position: toast.POSITION.BOTTOM_CENTER });
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.success(error, { position: toast.POSITION.TOP_CENTER });
    }
  };

  // like or unlike blog post
  const likePost = async () => {
    try {
      var response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs/blog/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ userId: user._id }),
        }
      );
      let data = await response.json();
      setIsLiked(data.message); // Toggle the isLiked state
      setLikeCount((prevValue) =>
        data.message === "Liked" ? prevValue + 1 : prevValue - 1
      );
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
    }
  };

  // handle like count
  const handleLikeCount = async () => {
    if (user === null) {
      return toast.error(
        "You must have an account in order to like this post",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
    await likePost();
  };

  // handle delete post
  const handleDeletePost = async () => {
    setModalShow(true);
  };

  const date = new Date();

  useEffect(() => {
    getBlogPost();
  }, []);
  return fullPost === null ? (
    <PostSkeleton/>
  ) : (
    <>
      <Container className="container-md py-4" style={{ maxWidth: 800 }}>
        <h1 className="display-3 border-bottom pb-2">{fullPost.title}</h1>
        <div className="d-flex justify-content-between">
          <h1 className="text-muted fst-italic py-2 h4">
            Post By {fullPost.author}
          </h1>
          <h1 className="text-muted my-auto py-2 h6">
            {new Date(fullPost.createdAt).toDateString()}
          </h1>
        </div>
        <div
          className="fw-light"
          dangerouslySetInnerHTML={{ __html: fullPost.content }}
        />

        {/* Like Button */}
        <div className="actions d-flex justify-content-between">
          <div className=" d-flex gap-2">
            {(user && fullPost.likes.includes(user._id)) ||
            isLiked === "Liked" ? (
              <i
                onClick={handleLikeCount}
                className="bi bi-suit-heart-fill link-danger cursor-pointer fs-4"></i>
            ) : (
              <i
                onClick={handleLikeCount}
                className="bi bi-suit-heart cursor-pointer fs-4"></i>
            )}
            <p className="fs-4" >{likeCount ?? 80}</p>
          </div>

          {user !== null ? (
            user.email === fullPost.email ? (
              <div className="d-flex gap-4">
                <i
                  className="bi bi-trash3-fill link-danger cursor-pointer fs-4"
                  onClick={handleDeletePost}></i>
                <i className="bi bi-pencil-fill cursor-pointer fs-4"></i>
              </div>
            ) : null
          ) : null}
        </div>
      </Container>

      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Do you want to delete this post?"
        message="Modal Message"
        action={deleteBlog}
      />
    </>
  );
}
