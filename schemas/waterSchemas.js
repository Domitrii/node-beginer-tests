import Joi from "joi";
const timeRegex =
  /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])-(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;


export const createWaterSchema = Joi.object({
  time: Joi.number().regex(timeRegex).required(),
  amount: Joi.string().max(5000).min(0)
});

export const updateWaterSchema = Joi.object({
  time: Joi.string().regex(timeRegex).required(),
  amount: Joi.string().max(5000).min(0)
})