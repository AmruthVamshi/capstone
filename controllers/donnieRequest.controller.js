const fs = require('fs');
const axios = require('axios');
let qs = require('qs');
const {DonnieRequest,Sequelize,Donnie,Donor} = require('../models');
const Op = Sequelize.Op;

exports.create = async (req,res)=>{
	//convert uploaded image to base64
	let image_data;

	if(req.file){
		image_data = {
			image_name:req.file.originalname,
			size:req.file.size,
			b64: new Buffer(fs.readFileSync(req.file.path)).toString('base64')
		};
		fs.unlinkSync(req.file.path);
	}

	const {requestDescription,childDescription,schoolName,schoolLocation} = req.body;

	try {
		let result;
		if(image_data){
			var data = qs.stringify({'image':image_data.b64});
			result = await axios({
				method: 'post',
				url: 'https://api.imgur.com/3/image/',
				headers: { 
					'Authorization': 'Client-ID 4cbcac83b80d2ae', 
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data : data
			});
		}
		let resultImage;
		if(result) resultImage=result.data.data.link;

		let newDonnieRequest = await DonnieRequest.create({
			requestDescription,
			childDescription,
			schoolName,
			schoolLocation,
			picture:resultImage,
			donnieID:req.donnie.id
		})


		//let donnie = await Donnie.findByPk(req.donnie.id);
		//newDonnieRequest.setDonnie(donnie);

		res.status(200).json({
			message:'created a request!.',
			body:newDonnieRequest
		})
		
	} catch(e) {
		console.log(e);
		res.status(401).json({
			message:'error while creating a request!.',
			error:e
		})
	}
}

exports.find = async (req,res)=>{
	const search = req.query.search;
	const id = req.query.id;
    let condition = search ? { requestDescription: { [Op.iLike]: `%${search}%` } } : null;
   	if (id) condition = id ? {donnieID:id}:null;
    if(search && id) condition = {requestDescription: { [Op.iLike]: `%${search}%` },donnieID:id} 

    try {
    	let response = await DonnieRequest.findAll({where:condition,include: ['donnie','donorResponse']});
    	response=response.filter(resp=>resp.donorResponse===null);
    	res.status(200).json({
    		message:"all requests by donnies 1",
    		body:response
    	})
    } catch(e) {
    	console.log(e);
    	res.status(401).json({
			message:'error while fetching all requests!.',
			error:e
		})
    }
}

exports.findResponses = async (req,res)=>{

    try {
    	let response = await DonnieRequest.findAll({where:{donnieID:req.donnie.id},include: ['donorResponse']});
    	response=response.filter(resp=>resp.donorResponse!==null);
    	let donors=[]
    	for(let i=0;i<response.length;i++){
    		let donor = await Donor.findByPk(response[i].donorResponse.donorID);
    		donors.push(donor);
    	}
    	response=response.map((resp,i)=>{
    		return{
    			requestDescription:resp.requestDescription,
    			time:resp.createdAt,
    			school:resp.schoolName,
    			donorResponse:resp.donorResponse,
    			donor:donors[i]
    		}
    	})
    	response=response.reverse();
    	res.status(200).json({
    		message:"all requests by donnies",
    		body:response
    	})
    } catch(e) {
    	console.log(e);
    	res.status(401).json({
			message:'error while fetching all requests!.',
			error:e
		})
    }
}

//TODO:Update this.
exports.update = async (req,res)=>{
	const id = req.params.id;
	try {
		const response = await DonnieRequest.update(req.body, {where: { id: id }});
		if(response==1){
			res.status(200).json({
				message:"sucessfuly updated your(donnie) profile!."
			})
		}else{
			throw "some error occured while updating your profile!."
		}
	} catch(e) {
		console.log(e);
    	res.status(401).json({
			message:e
		})
	}
}

exports.delete = async (req,res)=>{
	const id = req.params.id;
	try {
		const response = await DonnieRequest.destroy({where: { id: id }});
		if(response==1){
			res.status(200).json({
				message:"sucessfuly deleted your(donnie) profile!."
			})
		}else{
			throw "some error occured while deleting your profile!."
		}
	} catch(e) {
		console.log(e);
    	res.status(401).json({
			message:e
		})
	}
}
