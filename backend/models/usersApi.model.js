import { connect } from "../config/db/connectMysql.js";

class UsersApi {

  static async createUserApi({ username, email, passwordHash, statusId }) {
    const [result] = await connect.query(
      "INSERT INTO User (username, email, password_hash, status_id) VALUES (?, ?, ?, ?)",
      [username, email, passwordHash, statusId]
    );
    return result.insertId;
  }

  static async getUsersApi(){
    const [result] = await connect.query(
        'CALL sp_get_api_users();'
    )
    return result[0];
  }

  static async getApiUserById(id){
    const [result] = await connect.query(
      'CALL sp_get_api_user_by_id(?)',
      [id]
    )
    return result[0];
  }

    static async update(id, { email, status_id }) {
    const [result] = await connect.query(
      'UPDATE user SET email = ?, status_id = ?, updated_at =CURRENT_TIMESTAMP WHERE id = ?',
      [email, status_id, id]
    );
    return result.affectedRows > 0 ? this.getApiUserById(id) : null;
  }

  static async delete(id){
    const [result] = await connect.query(
      'DELETE FROM user WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.getApiUserById(id) : null;
  }
}

export default UsersApi;
