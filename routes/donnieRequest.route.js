const Router = require("express").Router();
const controller = require('../controllers/donnieRequest.controller');
const donnieVerify = require('../middleware/verifyJwtToken');
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
Router.get('/responses',donnieVerify.verifyToken,controller.findResponses);
Router.post('/',donnieVerify.verifyToken,upload.single('image'),controller.create);
Router.patch('/:id',donnieVerify.verifyToken,controller.update);
Router.delete('/:id',donnieVerify.verifyToken,controller.delete);

module.exports = Router;