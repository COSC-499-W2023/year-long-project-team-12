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
import DarkMode from "./components/DarkMode/DarkMode";


function App() {
  
  const { isCustomerAuthenticated } = useAuth();
  const Layout = () =>{
    return (
      <div className="app">
        <Navbar/>
       <DarkMode/>
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
      path:"/",
      element: (<ProtectedRoute><Layout/> </ProtectedRoute> ),
      children:[

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
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
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
