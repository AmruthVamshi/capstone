import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useState } from "react";
import axios from 'axios';
import qs from 'qs';
import {Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

function DonateModel(props) {
  const [state, dispatch] = useStateValue();
  const [address,setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const donate = ()=>{
  	let err=[];
  	if(!state.donor.address){
  		if(address==='') err.push('enter pickup address with your phone number!.')
  	} 
  	if(itemName==='') err.push('enter item name!');
  	if(itemDescription==='') err.push('enter itemDescription');
  	if(err.length){
  		err.forEach(e=>swal(e,"","error"));
  		return;
  	} 
  	if(address!==''){
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
  	var myHeaders = new Headers();
  	myHeaders.append("Access-Control-Allow-Credentials",true)
  	var formdata = new FormData();
	formdata.append("itemName", itemName);
	formdata.append("itemDescription", itemDescription);
	formdata.append("picture", imageUrl);


	var requestOptions = {
	  method: 'POST',
	  body: formdata,
	  redirect: 'follow',
	  credentials: 'include',
	  headers: myHeaders
	};
	fetch(`https://capstonebackend0.herokuapp.com/response/${props.id}`, requestOptions)
	  .then(response => response.text())
	  .then(result => {
	  	props.onHide();
	  	swal("Thank you! for your donation. You have helped a child with his/her education!",'','success');
	  	setTimeout(()=>{window.location.reload();},2000);
	  })
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
      			placeholder='enter your address with your mobile number'
      			onChange={e=>{setAddress(e.target.value)}}
      		/><br/>
      		<input
      				style={{width:"400px",height:"50px"}}
		            className="messageSender__input3"
		            type="text"
		            placeholder=" item Name"
		            value={itemName}
		            onChange={(e) => setItemName(e.target.value)}
		          /><br/>
		          <input
		          	style={{width:"400px",height:"50px"}}
		            className="messageSender__input4"
		            type="text"
		            placeholder="item description"
		            value={itemDescription}
		            onChange={(e) => setItemDescription(e.target.value)}
		          /><br/>
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
      				style={{width:"400px",height:"50px"}}
		            className="messageSender__input3"
		            type="text"
		            placeholder=" item Name"
		            value={itemName}
		            onChange={(e) => setItemName(e.target.value)}
		          /><br/>
		          <input
		          	style={{width:"400px",height:"50px"}}
		            className="messageSender__input4"
		            type="text"
		            placeholder="item description"
		            value={itemDescription}
		            onChange={(e) => setItemDescription(e.target.value)}
		          /><br/>
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