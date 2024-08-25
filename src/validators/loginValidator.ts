import { object, string } from 'yup'
import { requiredMsg, whitespaceMsg } from './validationMessages'

const loginSchema = object({
  username: string().matches(/^\S*$/, whitespaceMsg).required(requiredMsg),
  password: string().matches(/^\S*$/, whitespaceMsg).required(requiredMsg)
})

export default loginSchema
