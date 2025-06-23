import { Router } from "express";
import { verifyRole } from "../middleware/permissionsMiddleware.js";
import UserStatusController from '../controllers/userStatus.controller.js';
const router= Router();
const name='/userStatus';
// Public route
router.post(name, verifyRole(['admin']), UserStatusController.register);
router.get(name+'/', verifyRole(['admin','userapi']), UserStatusController.show);
router.get(name+'/:id',verifyRole(['admin']), UserStatusController.findById);
router.put(name+'/:id', verifyRole(['admin']), UserStatusController.update);
router.delete(name+'/:id',verifyRole(['admin']), UserStatusController.delete);

export default router;