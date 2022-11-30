import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostCard from "../components/blog_post_card";
import MySpinner from "../components/spinner";
import { getUser } from "../redux/userReducer";

export default function UserAccount() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState(null);

  const headers = new Headers();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(state=> state.user.userDetails);

  const checkSigninStatus = async () => {
    const token = window.localStorage.getItem("token");
    headers.append("Authorization", "Bearer " + token);
    if (!token) {
      navigate("/login");
    }
    try {
      let response = await fetch("https://bhagg-bloggs-server.onrender.com/blogs/users/me", { headers: headers });
      console.log("try fetch");
      let data = await response.json();
      dispatch(getUser(data));
      setUser(data);
      getUserBlogs(data);
      console.log(profile);
    } catch (error) { 
      console.log(error);
      navigate("/login");
    }
  };

  const getUserBlogs = async (info) => {
    console.log(info);
    try {
      let response = await fetch(`https://bhagg-bloggs-server.onrender.com/blogs/users/blogs/${info.email}`);
      console.log("try fetch");
      let data = await response.json();
      console.log(data);
      setUserBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkSigninStatus();
  }, []);
  return (
    user === null && userBlogs === null ? <MySpinner/> : <Container className="my-3">
      <h1 className="display-1 mx-auto text-center">{user.name}</h1>
      <h1 className="display-6 mb-5 text-center">{user.email}</h1>
        {userBlogs && (userBlogs.length > 0 ? userBlogs.map((each) => (
          <BlogPostCard
            key={each._id}
            author={each.author}
            content={each.content}
            title={each.title}
            id={each._id}
          />
        )): <h5 className="text-mute pt-5 position-absolute top-50 start-50 translate-middle">
        No Blog Post
      </h5>)}
    </Container>
  );
}
