import "./topbar.css";
import {useContext} from "react"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { AuthContext } from "../../Context/AuthContext";
import { Link,useHistory } from "react-router-dom";
export default function Topbar() {
  const history=useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext); 
    const logoutSession =(e )=>{
      e.preventDefault()
      localStorage.clear();
      window.location.reload();
      history.push("/register");
    }
    return (
        <div className="topbarContainer">
      <div className="topbarLeft">
          <span className="logo" onClick={()=>window.location.reload()}>Message <span style={{"color": "#ea4f4c"}}>App</span></span>
          
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Posts</span>
          <span className="topbarLink">Gallery</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
          
          <div className="profile">
          <img
            src={
            user.profilePicture
            ? PF + user.profilePicture
            : "https://www.svgrepo.com/show/106784/avatar.svg"}
            alt=""
            className="topbarImg"
          />
           <ArrowDropDownIcon className="icon"/>
           <div className="options">
           <Link to="/uploadImage">
              <span>Upload Image</span>
           </Link>
           <span onClick={logoutSession}>Logout</span>
          </div>
          </div>
      </div>
    </div>
    )
}
