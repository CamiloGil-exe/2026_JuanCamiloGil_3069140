import { Router } from 'express';
import {
  showProfiles,
  showProfileId,
  addProfile,
  updateProfile,
  deleteProfile
} from '../controllers/profiles.controller.js';

const router = Router();
// singular resource name used in URL
const apiName = '/profile';

router.route(apiName)
  .get(showProfiles)   // still returns all profiles
  .post(addProfile);

router.route(`${apiName}/:id`)
  .get(showProfileId)
  .put(updateProfile)
  .delete(deleteProfile);

export default router;