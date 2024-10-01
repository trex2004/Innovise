import { Navigate } from "react-router-dom";


const ProtectedRoute = (props) => {
  if (props.isLoggedIn) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default ProtectedRoute;