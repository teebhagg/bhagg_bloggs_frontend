import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogPostCard from "../components/blog_post_card";

export default function UserAccount() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState(null);

  const headers = new Headers();
  const params = useParams();
  const navigate = useNavigate();

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
      setUser(data);
      // user && console.log(user);
      getUserBlogs(data);
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
      // navigate('/login')
    }
  };

  useEffect(() => {
    checkSigninStatus();
  }, []);
  return (
    <Container className="my-3">
      {user && <h1 className="display-1 mx-auto text-center">{user.name}</h1>}
      {user && <h1 className="display-6 mb-5 text-center">{user.email}</h1>}
      {userBlogs &&
        userBlogs.map((each) => (
          <BlogPostCard
          key={each._id}
            author={each.author}
            content={each.content}
            title={each.title}
            id={each._id}
          />
        ))}
    </Container>
  );
}