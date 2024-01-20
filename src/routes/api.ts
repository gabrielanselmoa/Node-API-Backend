import { Router } from "express";
import * as userController from "../controllers/userControllers";
import * as permissionController from "../controllers/permissionController";

const router = Router();

// USERS
router.get("/user/all", userController.getAllUsers);
router.get("/user/info/view/:id", userController.getUserID);
router.put("/user/info/edit/:id", userController.edit);
router.post("/user/new", userController.create);
router.delete("/user/drop/:id", userController.deleteUserID);

// PERMISSIONS
router.get("/permission/all", permissionController.getAllPermissions);
router.post("/permission/new", permissionController.createPermissions);

export default router;
