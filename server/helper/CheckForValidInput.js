import Joi from 'joi';

class CheckForValidInput {
  /**
   * funtion to check if user input valid details during registration
   * @param {user} object
   */
  static createUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required()
        .error(() => 'Valid email field is required'),
      first_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'First name field is required with min length of 3 and must be alphabet'),
      last_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'last name field is required with min length of 3 and must be alphabet'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).trim().strict()
        .required()
        .error(() => 'Password field is required with mininum 6 characters'),
      address: Joi.string().trim().strict().min(25)
        .required()
        .error(() => 'Address field is required and should not be less than 25 characters'),
    });
    return Joi.validate(user, schema);
  }

  /**  funtion to validate login inputs
     * @param{details} string
     */
  static loginAuser(details) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim()
        .required()
        .error(() => 'Email is required'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().strict()
        .required()
        .error(() => 'you must provide a correct password'),
    });
    return Joi.validate(details, schema);
  }
}

export default CheckForValidInput;
