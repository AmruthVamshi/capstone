import React from "react";
import "./MessageSender.css";
import { Avatar, Input } from "@material-ui/core";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import Cookies from 'universal-cookie';
import { Button } from "@material-ui/core";
import swal from 'sweetalert';

function MessageSender() {
  //const [{ headmaster }, dispatch] = useStateValue();
  //const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  //const [setImage] = useState(null);
  const [{ headmaster }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message,setMessage] = useState("");

  const handleSubmit = (e) => {
    if(input==""||input2==''||input3==''||input4=='') {swal('please fill all the details!','','error');return;}
    const cookies = new Cookies();
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("x-access-token",cookies.get('logintoken'));

    var formdata = new FormData();
    formdata.append("requestDescription", input);
    formdata.append("childDescription", input2);
    formdata.append("schoolName", input3);
    formdata.append("schoolLocation", input4);
    formdata.append("image", imageUrl);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://capstonebackend0.herokuapp.com/request", requestOptions)
      .then(response => response.json())
      .then(result => {swal('Your request is registered!','','success');setTimeout(()=>{window.location.reload();},2000);})
      .catch(error => console.log('error', error));


    setInput("");
    setInput2("");
    setInput3("");
    setInput4("");
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
        <Avatar src={headmaster.photoURL} />
        <form className="messageSender__form">
          <input
            className="messageSender__input1"
            type="textarea"
            placeholder={`Write about your Requirements, ${headmaster.username}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            className="messageSender__input2"
            type="text"
            placeholder=" write short description of child"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <input
            className="messageSender__input3"
            type="text"
            placeholder=" School Name"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
          <input
            className="messageSender__input4"
            type="text"
            placeholder="school locality"
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
          />
          <Input
            className="messageSender__fileSelector"
            placeholder="upload image of school/child"
            type="file"
            onChange={handleChange}
            disableUnderline={true}
          />
          {/*<input
            value={imageUrl}
            placeholder="image url"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="image URL (Ootional)"
          />*/}
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div className="messageSender__bottom"></div>
    </div>
  );
}

export default MessageSender;
