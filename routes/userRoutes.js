
const {findAll} = require('../controllers/userController');
const {verifyJWTtoken} = require('../middlewares/userMiddleware');
const {adminValidations} = require('../middlewares/userMiddleware');


module.exports = (app)=>{
    app.get("/crm/findall",[verifyJWTtoken,adminValidations],findAll);
}