import { connect } from '../config/db/connectMysql.js';

class ProfileModel {

  static async create({user_id, first_name, last_name, address, phone, document_type_id, document_number, photo_url, birth_date }) {
    const [result] = await connect.query(
      'INSERT INTO Profile (user_id, first_name, last_name, address,phone,document_type_id,document_number,photo_url,birth_date) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)',
      [user_id, first_name, last_name, address, phone, document_type_id, document_number, photo_url, birth_date]
    );
    return result.insertId;
  }

  
  static async show() {
    try {
      let sqlQuery = "SELECT pr.*, dt.name AS document_type_name FROM profile pr INNER JOIN document_type dt ON pr.document_type_id = dt.id ORDER BY pr.id";
      const [result] = await connect.query(sqlQuery);
      return result;
    } catch (error) {
      return [0];
    }
  }

 
  static async update(id, { user_id, first_name, last_name, address, phone, document_type_id, document_number, photo_url, birth_date }) {
    const [result] = await connect.query(
      'UPDATE Profile SET user_id=?, first_name=?, last_name=?, address=?,phone=?,document_type_id=?,document_number=?,photo_url=?,birth_date=?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user_id, first_name, last_name, address, phone, document_type_id, document_number, photo_url, birth_date , id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM Profile WHERE id=?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  
  static async findById(id) {
    try {
      let sqlQuery = 'SELECT * FROM `Profile` WHERE `id`= ?';
      const [result] = await connect.query(sqlQuery, id);
      return result;
    } catch (error) {
      return [0];
    }

  }
 
}
export default ProfileModel;