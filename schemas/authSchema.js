import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const authSchema = Joi.object({
  name: Joi.string().default("User"),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().min(6).required(),
});

