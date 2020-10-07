const {Donor} = require('../models');

module.exports = async (req,res,next)=>{
	//only for debugging
	//TODO:remove this
	const donor = await Donor.findByPk(req.query.id);
	req.user=donor;
	if(req.user){
		if(req.user.donorID) return next();
		else res.sendStatus(401);
	}else{
		res.sendStatus(401);
	}
}