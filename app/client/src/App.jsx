import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import JobPostings from "./pages/JobPostings/JobPostings";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Uploader from "./pages/Uploader/Uploader";
import DoesNotExist from "./pages/DoesNotExist/DoesNotExist";
import "./app.scss";
import {useAuth} from "./context/authContext";


function App() {
  const currentUser = useAuth();
  
  const Layout = () =>{
    return (
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute><Layout/> </ProtectedRoute> ,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/jobs",
          element:<JobPostings/>
        },
        {
          path:"/upload",
          element:<Uploader />
        },
        {
          path:"*",
          element:<DoesNotExist />
        }
      ]
    }
    
   
  
  ])
  
  
  return ( 
  <div>
    <RouterProvider router={router}/>
  </div> 
  );
}

export default App;
