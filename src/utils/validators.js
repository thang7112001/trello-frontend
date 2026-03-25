export const FIELD_REQUIRED_MESSAGE = 'this field is required'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'email is valid'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE =
  'password must include at least 1 letter, a number, and at least 8 character'

// file utils/validators.js
const LIMIT_COMMON_FILE_SIZE = 10485760 // 10MB
const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size) {
    return 'File cannot be empty.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid. Only accept png, jpg and jpeg'
  }
  return null
}
