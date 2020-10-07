module.exports = (sequelize,Sequelize) => {
	const Donor = sequelize.define('donor',{
		donorID:{
			type:Sequelize.STRING,
			required:true
		},
		username:{
			type:Sequelize.STRING,
			required:true
		},
		email:{
			type:Sequelize.STRING,
			required:true
		},
		address:{
			type:Sequelize.STRING
		},
		profile_pic:{
			type:Sequelize.STRING
		}
	});
	return Donor;
}