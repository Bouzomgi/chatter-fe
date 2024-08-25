import { object, string } from 'yup'
import { requiredMsg, whitespaceMsg } from './validationMessages'

const registerSchema = object({
  username: string().matches(/^\S*$/, whitespaceMsg).required(requiredMsg),
  email: string().email('Invalid email').required(requiredMsg),
  password: string()
    .matches(/^\S*$/, whitespaceMsg)
    .min(5, 'Must be at least 5 characters')
    .required(requiredMsg)
})

export default registerSchema
