import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useAuth} from "../../context/authContext";
import MockJobsAppliedTo from "../../components/JobsApplliedTo/MockJobsAppliedTo";
import { useState } from "react";

const Profile = () => {


  const {  currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const[text, setText]  = useState("Show");
  const toggle = () => {
    setOpen(!open);
    if (!open){
      setText("Hide")
    }
    else{
      setText("Show")
    }
  };

    
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src=""
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          
          <div className="center">
            <span>{currentUser.firstname} {currentUser.lastname}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser.role}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser.email}</span>
              </div>
            </div>
            <button onClick={toggle} className="toggleJobsAppliedTo">{text} Jobs you have applied to...</button>
          </div>
          
        </div>
      </div>
      
       
          
          {open && (
            <div className="jobsAppliedToContainer">
            <h1>Jobs You Have Applied To</h1>
            <MockJobsAppliedTo />

            </div>
          )
          }
        

    </div>
  );
};

export default Profile;