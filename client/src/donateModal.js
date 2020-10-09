import React from "react";
import "./Login.css";
import Helpinghands from "./Helpinghands.png";
import { Button } from "@material-ui/core";
import { Avatar, Input } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import {Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

function DonateModel(props) {
  const [state, dispatch] = useStateValue();
  const [address,setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const donate = ()=>{
  	if(address){
  		var data = qs.stringify({
		 'address': address 
		});
		var config = {
		  method: 'patch',
		  url: 'https://capstonebackend0.herokuapp.com/donor',
		  credentials: 'include',
		  headers: { 
		  	Accept: "application/x-www-form-urlencoded",
		    'Content-Type': 'application/x-www-form-urlencoded',
		    "Access-Control-Allow-Credentials": true
		  },
		  data : data
		};

		axios(config)
		.then(function (response) {
		  dispatch({
	          type: actionTypes.SET_DONOR,
	          donor: response.data.body,
	       });
		})
		.catch(function (error) {
		  console.log(error);
		});
  	}

  	var formdata = new FormData();
	formdata.append("itemName", itemName);
	formdata.append("itemDescription", itemDescription);
	formdata.append("image", imageUrl);

	console.log(imageUrl)
	console.log(props.id)

	var requestOptions = {
	  method: 'POST',
	  body: formdata,
	  redirect: 'follow',
	  credentials: 'include',
	  headers: { 
	  	Accept: "application/x-www-form-urlencoded",
	    'Content-Type': 'application/x-www-form-urlencoded',
	    "Access-Control-Allow-Credentials": true
	  }
	};
	fetch(`https://capstonebackend0.herokuapp.com/response/${props.id}`, requestOptions)
	  .then(response => response.text())
	  .then(result => {console.log(result);props.onHide();window.location.reload()})
	  .catch(error => console.log('error', error));

  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(e.target.files[0]);
    }
  };
 
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thanks a lot for considering about this donation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
      {
      	!state.donor.address?(
      		<div>
      		<input 
      			value={address}
      			style={{width:"400px",height:"50px"}}
      			type='textarea'
      			row="5"
      			placeholder='enter your address'
      			onChange={e=>{setAddress(e.target.value)}}
      		/><br/>
      		<input
		            className="messageSender__input3"
		            type="text"
		            placeholder=" item Name"
		            value={itemName}
		            onChange={(e) => setItemName(e.target.value)}
		          />
		          <input
		            className="messageSender__input4"
		            type="text"
		            placeholder="item description"
		            value={itemDescription}
		            onChange={(e) => setItemDescription(e.target.value)}
		          />
		          <Input
		            className="messageSender__fileSelector"
		            placeholder="upload image of what you are donating"
		            type="file"
		            onChange={handleChange}
		            disableUnderline={true}
		          />
		          </div>
      		):(
      		<div>
      			<input
		            className="messageSender__input3"
		            type="text"
		            placeholder=" item Name"
		            value={itemName}
		            onChange={(e) => setItemName(e.target.value)}
		          />
		          <input
		            className="messageSender__input4"
		            type="text"
		            placeholder="item description"
		            value={itemDescription}
		            onChange={(e) => setItemDescription(e.target.value)}
		          />
		          <Input
		            className="messageSender__fileSelector"
		            placeholder="upload image of what you are donating"
		            type="file"
		            onChange={handleChange}
		            disableUnderline={true}
		          />
		    </div>
      		)
      }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={donate}>Donate</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DonateModel;