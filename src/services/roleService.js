const { pool } = require("../services/db");
import Constant from "../config/config.js";
export default class RoleService {
  static instance = new RoleService();

  async findByUserId(id) {
    const roles = await pool.query('SELECT * FROM public."Role" WHERE id = $1', [
      id,
    ]);
    if (roles.rows.length > 0) {
      return roles.rows.map(role => role.name);
    } else {
      return null;
    }
  }
}
