import UserModel from '../models/user.model.js';
import UsersApiModel from '../models/usersApi.model.js';
import { encryptPassword, comparePassword } from '../library/appBcrypt.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import UserRole from '../models/userRole.model.js';
dotenv.config();
class UsersApiController {

    async registerUserApi(req, res) {
    try {
      const { username, email, password_hash, status_id } = req.body;
      // Basic validation
      if (!username || !email || !password_hash || !status_id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Additional validation
      if (password_hash.length < 8) {
        return res.status(400).json({
          error: 'The password must be at least 8 characters long.'
        });
      }
      // Verify if the User already exists
      const existingUser = await UserModel.findByName(username);
      if (existingUser) {
        return res.status(409).json({
          error: 'The username is already in use'
        });
      }
      const passwordHash = await encryptPassword(password_hash);
      const userId = await UserModel.create({
        username,
        email,
        passwordHash,
        statusId: status_id
      });

      const role = await UserRole.create({
        user_id: userId,
        role_id: 4,
        status_id: status_id
      });

      res.status(201).json({
        message: 'User created successfully',
        id: userId
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showApiUsers(req, res){
    try{
      const usersApiModel = await UsersApiModel.getUsersApi();

      if(!usersApiModel){
        return res.status(200).json({
          message: "No api users founded"
        });
      };

      return res.status(200).json({
        message: "Api users retrieved successfully",
        data: usersApiModel
      });

    }catch(error){
      return res.status(500).json({
        error: "Internal Server Error",
      })
    }
  }

  async update(req, res) {
    try {
         const { email,  status_id } = req.body;
         const id = req.params.id;
      // Basic validation
      if (!email || !status_id|| !id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User already exists  
      const existingUser = await UsersApiModel.getApiUserById(id);
      if (existingUser.length === 0) {
        return res.status(409).json({ error: `The API user with ID: ${id} does not exists` });
      }   

      const updateUserApiModel = await UsersApiModel.update(id, {email, status_id});
      res.status(200).json({
        message: 'User update successfully',
        data: updateUserApiModel

      });
    } catch (error) {
      console.error('Error in update user api controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User already exists
      const deleteUserModel = await UsersApiModel.delete(id);
      res.status(204).json({
        message: `Api user with ID: ${id} deleted successfully`,
        data: deleteUserModel
      });
    } catch (error) {
      console.error('Error in delete user api controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the User already exists
      const existingUserApi = await UsersApiModel.getApiUserById(id);
      console.log(existingUserApi);
      if (existingUserApi.length === 0) {
        return res.status(409).json({ error: `The API user with ID: ${id} does not exists` });
      }
      res.status(200).json({
        message: `API user with ID: ${id} retrieved successfully`,
        data: existingUserApi
      });
    } catch (error) {
      console.error('Error in find by id:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { user, password } = req.body;
      // Basic validate
      if (!user || !password) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Check if the user already exists
      const existingUser = await UserModel.findByName(user);
      console.log(existingUser);
      if (existingUser) {
        const passwordHash = await comparePassword(password, existingUser.password_hash);
        if (!passwordHash) {
          return res.status(401).json({ error: 'Invalid password' });
        } else {
          const updateLogin = await UserModel.updateLogin(existingUser.id);
          if (!updateLogin) {
            return res.status(500).json({ error: 'Failed to update login time' });
          }
          const token = jwt.sign({ id: existingUser.id, email: existingUser.email, status: existingUser.status_id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
            algorithm: "HS256"
          });
          res.status(200).json({
            message: 'Login successful',
            user: {
              id: existingUser.id,
              username: existingUser.username,
              email: existingUser.email,
              statusId: existingUser.statusId,
              token: token
            }
          });
        }
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error in registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UsersApiController();