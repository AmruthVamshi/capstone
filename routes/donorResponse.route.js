var Router = require("express").Router();
const controller = require('../controllers/donorResponse.controller');
const multer = require('multer');
const storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'./uploads/')
	},
	filename:(req,file,cb)=>{
		cb(null,new Date().toISOString()+'-'+file.originalname) 
	}
});
const fileFilter = (req,file,cb)=>{
	cb(null,(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'));
}
const upload=multer({storage,fileFilter});

Router.get('/',controller.find);
Router.post('/:requestID',upload.single("picture"),controller.create);


module.exports = Router;