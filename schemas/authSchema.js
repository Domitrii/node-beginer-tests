import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const authSchema = Joi.object({
  name: Joi.string().default("User"),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().min(6).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().min(5),
  gender: Joi.string(),
  weight: Joi.number(),
  dailyNorm: Joi.number(),
  timeActive: Joi.number(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

