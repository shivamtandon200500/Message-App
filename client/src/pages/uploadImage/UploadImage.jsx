import "./uploadImage.css"
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios"; 
export default function UploadImage() {
    const [file, setFile] = useState(null); 
    const { user } = useContext(AuthContext);
    const history=useHistory();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          user.profilePicture = fileName;
          console.log(user.profilePicture);
          try {
            const res=await axios.post("/upload", data);
            console.log(res)
            const a=await axios.patch("/users/"+user._id,{profilePicture:user.profilePicture});
            console.log("heelllo",a)
              history.push("/")
              window.location.reload();
          }
          catch (err) {
            console.log(err)
        }
      }
      };
    return (
        <>
        <div className="uploadImage">
            <div className="back">
                <div class="btn btn-two">
                    <span onClick={()=>history.push("/")}>CANCEL</span>
                </div>
            </div>
            <form onSubmit={submitHandler}>
            {!file?
            <>
                <label for="name"> Upload Profile Picture</label>
                <input type="file" 
                name="file" 
                className="uploadFile"
                id="name"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                />
                </>
                :<button className="submitFile" type="submit">upload</button>
                }
            
            
            </form> 
        </div>
        </>
        )
}
