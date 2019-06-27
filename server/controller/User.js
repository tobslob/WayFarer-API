import db from '../model/Db';
import CheckForValidInput from '../helper/CheckForValidInput';
import Helper from '../helper/Helper';
import Authentication from '../middleware/Authentication';
import { createUserQuery } from '../model/query/Userquery';


class User {
  /**
       * signup a user into the app
       * @param {*} req
       * @param {*} res
       */
  static async createUser(req, res) {
    const { error } = CheckForValidInput.createUser(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const hashpassword = Helper.hashPassword(req.body.password);
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      hashpassword,
      false,
      new Date(),
      new Date(),
    ];
    try {
      const { rows } = await db.query(createUserQuery, values);
      const token = Authentication.generateToken(
        rows[0].user_id,
        rows[0].email,
        rows[0].is_admin,
      );

      return res.status(201).json({
        token,
        status: 'success',
        data: rows[0],
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'User already exist',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default User;
