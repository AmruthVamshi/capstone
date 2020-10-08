import React from "react";
import "./MessageSender.css";
import { Avatar, Input } from "@material-ui/core";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function MessageSender() {
  //const [{ user }, dispatch] = useStateValue();
  //const [input, setInput1] = useState("");
  // const [input2, setInput2] = useState("");
  //const [input3, setInput3] = useState("");
  //const [input4, setInput4] = useState("");
  //const [input5, setInput5] = useState("");
  //const [setImage] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: imageUrl,
    });
    setInput("");
    setImageUrl("");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(e.target.files[0]);
    }
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form className="messageSender__form">
          <input
            className="messageSender__input1"
            type="text"
            placeholder={`Write about your Requirements, ${user.displayName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            className="messageSender__input2"
            type="text"
            placeholder=" write short description of child"
            //value={input2}
            //onChange={(e) => setInput2(e.target.value)}
          />
          <input
            className="messageSender__input3"
            type="text"
            placeholder=" School Name"
            //value={input3}
            //onChange={(e) => setInput3(e.target.value)}
          />
          <input
            className="messageSender__input4"
            type="text"
            placeholder="school locality"
            //value={input4}
            // onChange={(e) => setInput4(e.target.value)}
          />
          <input
            className="messageSender__input5"
            type="text"
            placeholder="gender of the child"
            //value={input5}
            //onChange={(e) => setInput5(e.target.value)}
          />
          {/*<Input
            className="messageSender__fileSelector"
            placeholder="upload image of school/child"
            type="file"
            onChange={handleChange}
            disableUnderline={true}
          />*/}
          <input
            value={imageUrl}
            placeholder="image url"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image URL (Ootional)"
          />
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom"></div>
    </div>
  );
}

export default MessageSender;
