import RoleModulesModel from '../models/role_modules.model.js';

const roleModulesModel = new RoleModulesModel();

// 🔹 Mostrar todos
const showRoleModules = async (req, res) => {
  return roleModulesModel.showRoleModules(res);
};

// 🔹 Mostrar por ID
const showRoleModuleId = async (req, res) => {
  return roleModulesModel.showRoleModuleById(res, req);
};

// 🔹 Crear
const addRoleModule = async (req, res) => {
  return roleModulesModel.addRoleModule(req, res);
};

// 🔹 Actualizar
const updateRoleModule = async (req, res) => {
  return roleModulesModel.updateRoleModule(req, res);
};

// 🔹 Eliminar
const deleteRoleModule = async (req, res) => {
  return roleModulesModel.deleteRoleModule(req, res);
};

export {
  showRoleModules,
  showRoleModuleId,
  addRoleModule,
  updateRoleModule,
  deleteRoleModule
};