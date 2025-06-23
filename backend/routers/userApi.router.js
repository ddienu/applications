import { Router } from "express";
import UserApiController from '../controllers/userApi.controller.js';
import userApiController from "../controllers/userApi.controller.js";
import { verifyRole } from "../middleware/permissionsMiddleware.js";
const router = Router();
const name = '/userApi';
const nameLogin = '/login';

// Public route
router.post(name, verifyRole(['admin']), UserApiController.registerUserApi);
router.get(name, verifyRole(['admin']), UserApiController.showApiUsers)
router.get(name+"/:id", verifyRole(['admin']), UserApiController.findById);
router.put(name+"/:id", verifyRole(['admin']), userApiController.update);
router.delete(name+"/:id", verifyRole(['admin']), userApiController.delete);

export default router;