import axios from "axios";
import { useEffect, useState } from "react"
import "./conversations.css"

export default function Conversations({conversation,currentUser}) {
  const [user,setUser]=useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log("frin",friendId)
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  },
   [conversation,currentUser]
   );
    return (
        <div className="conversation">
        <img
          className="conversationImg"
          src={
                user?.profilePicture
                ? PF + user.profilePicture
                : "https://www.svgrepo.com/show/106784/avatar.svg"
                }
          alt=""
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    )
}
