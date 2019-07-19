import db from '../model/Db';
import CheckForValidInput from '../helper/CheckForValidInput';
import {
  createBusQuery, getAllBusQuery,
} from '../model/query/TripQuery';


class Bus {
  /**
   * Admin can add bus for a trip
   * @param {*} req
   * @param {*} res
   */
  static async addBusForTrip(req, res) {
    // check for admin user
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized!, Admin only route',
      });
    }

    const { error } = CheckForValidInput.addBusForTrip(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const values = [
      req.body.number_plate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      new Date(),
    ];
    try {
      const { rows } = await db.query(createBusQuery, values);

      return res.status(201).json({
        status: 'success',
        data: rows[0],
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Bus already exist!',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
   * Admin can get all bus present in database
 *@param {req} object
 *@param {res} object
 */
  static async getAllBus(req, res) {
    // check for admin user
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized!, Admin only route',
      });
    }
    try {
      const { rows } = await db.query(getAllBusQuery);
      if (rows.length <= 0) {
        return res.status(404).json({
          status: 'error',
          error: 'No trips found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default Bus;
