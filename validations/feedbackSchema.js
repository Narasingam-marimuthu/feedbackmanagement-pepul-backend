const Joi = require('joi');

const feedbackSchema = Joi.object({
  title: Joi.string().max(100).required(),
  platform: Joi.string().valid('1', '2', '3').required(),
  module: Joi.number().integer().required(),
  description: Joi.string().max(500).required(),
  attachment: Joi.string().uri().allow(null),
  tags: Joi.string().required(),
});

const feedBackParams = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {feedbackSchema, feedBackParams};
