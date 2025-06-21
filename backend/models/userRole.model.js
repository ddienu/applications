import { connect } from "../config/db/connectMysql.js";

class UserRole{

    static async create({user_id, role_id, status_id}){
        try{
            const [result] = await connect.query('INSERT INTO user_role(user_id, role_id, status_id) VALUES(?,?,?);', [user_id, role_id, status_id]);
            return result.insertId;
        }catch{
            return [0];
        }
    }

    static async getUserById(userId){
        try{
            const [result] = await connect.query('SELECT r.name FROM user_role r ON ur.role_id = r.id WHERE ur.user_id = ?', [userId]);
            return result.map(row => row.name);
        }catch{
            return null;
        }
    }
}

export default UserRole;