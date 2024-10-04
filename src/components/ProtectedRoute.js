import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./axiosbaseurl";


const ProtectedRoute = (props) => {

  const [authToken,setAuthToken] = useState(localStorage.getItem('authToken'))
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const data = await api.get("/test",{headers: {Authorization: 'Bearer ' + authToken}})
        if (data.status === 200) {
        setIsAuthorized(true);
        }
      } catch (error) {
        console.log("Check auth error somewhere");
      } finally {
        setIsLoading(false);
      }
    }
    if (authToken) {
      checkAuthorization();
    } else {
      setIsLoading(false); 
    }
  },[authToken])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthorized) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default ProtectedRoute;