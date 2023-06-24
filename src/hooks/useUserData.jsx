import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, resetUser } from "../redux/userReducer";

export default function useUserData() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.userDetails);
  const headers = new Headers();
  const token = window.localStorage.getItem("token");
  headers.append("Authorization", "Bearer " + token);

  const verify = async() => {
    setLoading(true)
      if (!token) {
        // navigate("/login");
        resetUser();
        return setError("No token");
      }
      try {
        let response = await fetch(
          "https://bhagg-bloggs-server.onrender.com/blogs/users/me",
          { headers: headers }
        );
        let data = await response.json();
        dispatch(getUser(data));
        setUser(data);
      } catch (error) {
        console.log(error);
        // navigate("/login");
        setError(error);
      } finally {
        setLoading(false)
      }
  }

  useEffect(()=>{
    verify();
  },[]);

  return { user, error, loading };
}
