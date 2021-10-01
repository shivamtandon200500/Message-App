import "./chatOnline.css"
import { useState,useEffect } from "react";
import axios from "axios"
export default function ChatOnline({onlineUsers,currentId,setCurrentChat,setRefresh}) {
    const [friends, setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
        const getFriends = async () => {
          const res = await axios.get("/users/friends/" + currentId);
          setFriends(res.data.friends);
        };
        getFriends();
      }, [currentId]);
    
      const createConverstaion=async(senderId,receiverId)=>{
       await axios.post("/conversations/",{senderId,receiverId}).then(res=>setRefresh(res));


      }
      const handleClick = async (user) => {
        try {
          const res = await axios.get(
            `/conversations/find/${currentId}/${user._id}`
          );
          setCurrentChat(res.data);
          console.log(res.data)
          if(!res.data){
            createConverstaion(user._id,currentId)
          }
        } catch (err) {
          console.log(err);
        }
      };
      
    return (
        <div className="chatOnline ">
            {friends.map((o)=>( <>{onlineUsers.find((f)=>f.userId===o._id)?
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
              o.profilePicture
              ? PF + o.profilePicture
              : "https://www.svgrepo.com/show/106784/avatar.svg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>:null}
        </>
      ))}
        </div>

    )
}