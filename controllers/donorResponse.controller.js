const fs = require('fs');
const axios = require('axios');
let qs = require('qs');
const { DonorResponse,Sequelize,Donor,DonnieRequest } = require('../models');
const Op = Sequelize.Op;

exports.create = async (req,res)=>{
	let image_data;
	const {requestID} = req.params;
	//convert uploaded image to base64 
	if(req.file){
		const image_data = {
			image_name:req.file.originalname,
			size:req.file.size,
			b64: new Buffer(fs.readFileSync(req.file.path)).toString('base64')
		};
		fs.unlinkSync(req.file.path);
	}

	const {itemName,itemDescription} = req.body;

	try {
		let result;
		if(image_data){
			var data = qs.stringify({'image':image_data.b64});
			const result = await axios({
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

		let newDonorResponse = await DonorResponse.create({
			itemName,
			itemDescription,
			picture:resultImage,
		})

		newDonorResponse.donorResponseID=newDonorResponse.id;
		newDonorResponse.donorId=req.user.id;

		let donnieRequest = await DonnieRequest.findByPk(requestID);
		let donor = await Donor.findByPk(req.user.id);

		newDonorResponse.setDonnieRequest(donnieRequest);
		donnieRequest.setDonorResponse(newDonorResponse);
		newDonorResponse.setDonor(donor);

		res.status(200).json({
			message:'created a response!.',
			body:newDonorResponse
		})
	} catch(e) {
		console.log(e);
		res.status(401).json({
			message:'error while creating a response!.',
			error:e
		})
	}
}

exports.find = async (req,res)=>{

    try {
    	let response = await DonorResponse.findAll({where:{donorId:req.user.id},include: ['donnieRequest','donor']});
    	res.status(200).json({
    		message:"all of your donations!",
    		body:response
    	})
    } catch(e) {
    	console.log(e);
    	res.status(401).json({
			message:'error while fetching all donations!.',
			error:e
		})
    }
}

/*
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
*/