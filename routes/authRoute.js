const {signup} = require('../controllers/authController');
const {signin}= require('../controllers/authController');
const {signUpValidations} = require('../middlewares/authValidations');
const {signInValidations} = require('../middlewares/authValidations');

module.exports = (app)=>{
    app.post("/crm/signup",[signUpValidations],signup);
    app.post("/crm/signin",[signInValidations],signin);
}

