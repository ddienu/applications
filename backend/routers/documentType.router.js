import { Router } from "express";
import { verifyRole } from "../middleware/permissionsMiddleware.js";
import DocumentTypeController from '../controllers/documentType.controller.js';
const router= Router();
const name='/documentType';
// Public route
router.post(name, verifyRole(['admin']), DocumentTypeController.register);
router.get(name+'/',verifyRole(['admin']), DocumentTypeController.show);
router.get(name+'/:id',verifyRole(['admin']), DocumentTypeController.findById);
router.put(name+'/:id', verifyRole(['admin']), DocumentTypeController.update);
router.delete(name+'/:id', verifyRole(['admin']), DocumentTypeController.delete);

export default router;