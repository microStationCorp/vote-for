import Joi from "joi";
import { NewPollInterface } from "./interfaces";

const CreatePollSchema = Joi.object({
  subject: Joi.string().required().label("Subject").messages({
    "string.empty": "{{#label}} Cannot be empty",
  }),
  totalNominations: Joi.number().required(),
  nominations: Joi.array()
    .min(2)
    .label("Nominations")
    .unique((a, b) => a.nomination.toUpperCase() === b.nomination.toUpperCase())
    .messages({
      "array.unique": "{{#label}} are must be unique",
    })
    .items(
      Joi.object({
        nomination: Joi.string().required().label("nomination").messages({
          "string.empty": "{{#label}} Cannot be empty",
        }),
      })
    ),
});

export const CreatePollFormValidation = (data: NewPollInterface) =>
  CreatePollSchema.validate(data);
