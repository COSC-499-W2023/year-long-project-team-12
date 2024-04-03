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
import Admin from "./pages/Admin/Admin";
import Edit from "./pages/Admin/EditRequest";
import Recording from "./pages/Recording/Recording";
import "./app.scss";
import {useAuth} from "./context/authContext";
import ViewVideo from "./pages/ViewVideo/ViewVideo";
import ChangeName from "./pages/ChangeUserInfo/ChangeName";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import ChangePassword from "./pages/ChangeUserInfo/ChangePassword";



function App() {
  const { isCustomerAuthenticated } = useAuth();
const Layout = () =>{
    return (
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    );
  };

  const ProtectedRoute = ({children}) =>{
    if(!isCustomerAuthenticated()){
      return <Navigate to="/login"/>
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/admin", 
          element: <Admin />
        },
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/jobs",
          element:<JobPostings/>
        },
        {
          path:"/changename",
          element:<ChangeName/>,
        },
        {
          path:"/changePassword",
          element:<ChangePassword/>,
        },
        {
          path:"/upload",
          element:<Uploader />
        },
        {
          path:"/recording",
          element:<Recording />
        },
        {
          path:"/viewVideo",
          element:<ViewVideo />
        },
        {
          path:"/editRequest",
          element:<Edit />
        }        
      ],
    },
    {
      path:"/",
      element:<Layout/>,
      children:[

        {
          path:"/home",
          element:<Home/>
        },
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
          path:"/contactUs",
          element:<ContactUs/>
        },
        {
          path:"*",
          element:<DoesNotExist />
        }
      
  ]}
  
  ]);

  return (
    <div className="app">
      
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
