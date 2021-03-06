import db from '../model/Db';
import CheckForValidInput from '../helper/CheckForValidInput';
import Helper from '../helper/Helper';
import Authentication from '../middleware/Authentication';
import { createUserQuery, loginUserQuery } from '../model/query/Userquery';


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
      hashpassword,
      false,
      new Date(),
      new Date(),
    ];
    try {
      const { rows } = await db.query(createUserQuery, values);
      const user = rows[0];
      const { user_id, email, is_admin } = rows[0];

      const token = Authentication.generateToken(user_id, email, is_admin);

      return res.status(201).json({
        status: 'success',
        data: {
          token,
          ...user,
        },
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


  /**
       * log a user in to the app
       * @param {*} req
       * @param {*} res
       */
  static async loginUser(req, res) {
    const { error } = CheckForValidInput.loginAuser(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    try {
      // Select all user record where email is equal db email
      const { rows } = await db.query(loginUserQuery, [req.body.email]);
      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'User not Found',
        });
      }

      // compare user provided password against db
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).json({
          status: 'error',
          error: 'Email/Password incorrect',
        });
      }

      const {
        user_id, email, is_admin,
        first_name, last_name,
      } = rows[0];

      // generate token
      const token = Authentication.generateToken(user_id, email, is_admin);

      // return success message
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user_id,
          email,
          is_admin,
          first_name,
          last_name,
        },
      });
    } catch (errors) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default User;
