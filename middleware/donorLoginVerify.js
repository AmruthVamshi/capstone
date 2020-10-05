module.exports = (req,res,next)=>{
	if(req.user){
		if(req.user.donorID) return next();
		else res.sendStatus(401);
	}else{
		res.sendStatus(401);
	}
}