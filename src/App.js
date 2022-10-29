import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav_bar";
import FullBlogPost from "./pages/full_blog_post";
import HomePage from "./pages/home_page";
import LogInPage from "./pages/login_page";
import NewPostPage from "./pages/new_post_page";
import SignUpPage from "./pages/sign_up_page";
import { getBlogs } from "./redux/blog_reducer";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogPosts);
  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        let response = await fetch("/blogs");
        let data = await response.json();
        console.log(data);
        dispatch(getBlogs(data));
        {
          blogs && console.log(blogs);
        }
      } catch (error) {
        console(error.mesage);
      }
    };

    getBlogPosts();
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/new-post/" element={<NewPostPage />} />
        <Route path="/:id" element={<FullBlogPost />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
