const Joi = require('joi');

const validateBody = (schema) => (req, res, next) => {
    console.log("Request Body:", req.body);
  
    const { error, value } = schema.validate(req.body);  // Validate the body using Joi schema
  
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
  
    next();  
  };
  

const validateParams = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  req.params = value;
  next();
}
module.exports = {validateBody, validateParams};
