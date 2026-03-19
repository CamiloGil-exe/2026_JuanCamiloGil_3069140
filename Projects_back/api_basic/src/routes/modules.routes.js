import { Router } from 'express';
import {
  showModules,
  showModuleId,
  addModule,
  updateModule,
  deleteModule
} from '../controllers/modules.controller.js';

const router = Router();
const apiName = '/modules';

router.route(apiName)
  .get(showModules)
  .post(addModule);

router.route(`${apiName}/:id`)
  .get(showModuleId)
  .put(updateModule)
  .delete(deleteModule);

export default router;