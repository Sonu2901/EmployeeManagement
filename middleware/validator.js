const { check, validationResult }
    = require('express-validator');
exports.valiDate=[check('email').isEmail().withMessage('Invalid Email address'),check('tel').isNumeric().withMessage('Invalid Mobile Number'),
    check('details').not().isEmpty().withMessage('User Details can not be Empty'),(req,res,next)=>{
        const errors=validationResult(req);
        //console.log(errors);
        if(!errors.isEmpty()){
            return res.render('404',errors);
        }
        next();
    }];