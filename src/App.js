import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav_bar";
import FullBlogPost from "./pages/full_blog_post";
import HomePage from "./pages/home_page";
import LogInPage from "./pages/login_page";
import NewPostPage from "./pages/new_post_page";
import SignUpPage from "./pages/sign_up_page";
import UserAccount from "./pages/user_account";
import { getBlogs } from "./redux/blog_reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExploreGenres from "./pages/explore_genres";
import useUserData from "./hooks/useUserData";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moreData, setMoreData] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { user, error, loading } = useUserData()
  
  const getBlogPosts = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://bhagg-bloggs-server.onrender.com/blogs?page=${page}`
      );
      let data = await response.json();
      if (data.length > 0) {
        setBlogs((prevData) => [...prevData, ...data]);
        setPage((prevPage) => prevPage + 1);
        setMoreData(true);
      } else {
        setMoreData(false);
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getBlogPosts();
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index path="/" element={<HomePage blogs={blogs} isLoading={isLoading} moreData={moreData} />} />
        <Route path="/new-post/" element={<NewPostPage />} />
        <Route path="/explore-genres/" element={<ExploreGenres />} />
        <Route path="/:id" element={<FullBlogPost />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/user" element={<UserAccount />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
