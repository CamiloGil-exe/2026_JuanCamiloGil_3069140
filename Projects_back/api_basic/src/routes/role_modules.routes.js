import { Router } from 'express';
import {
  showRoleModules,
  showRoleModuleId,
  addRoleModule,
  updateRoleModule,
  deleteRoleModule
} from '../controllers/role_modules.controller.js';

const router = Router();
const apiName = '/role-modules';

router.route(apiName)
  .get(showRoleModules)      // Get all RoleModules
  .post(addRoleModule);      // Add RoleModule

router.route(`${apiName}/:id`)
  .get(showRoleModuleId)     // Get RoleModule by Id
  .put(updateRoleModule)     // Update RoleModule by Id
  .delete(deleteRoleModule); // Delete RoleModule by Id

export default router;