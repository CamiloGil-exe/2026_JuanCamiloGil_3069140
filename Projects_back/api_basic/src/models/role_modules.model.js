import { connect } from '../config/db/connect.js';

class RoleModulesModel {
  constructor(id, module_fk, role_fk) {
    this.id = id;
    this.module_fk = module_fk;
    this.role_fk = role_fk;
  }

  // ✅ Crear relación Rol - Módulo
  async addRoleModule(req, res) {
    try {
      const { Modules_fk, Roles_fk } = req.body;

      if (!Modules_fk || !Roles_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let sqlQuery = `
        INSERT INTO role_modules (Modules_fk, Roles_fk)
        VALUES (?, ?)
      `;

      const [result] = await connect.query(sqlQuery, [Modules_fk, Roles_fk]);

      res.status(201).json({
        data: [{ id: result.insertId, Modules_fk, Roles_fk }],
        status: 201
      });

    } catch (error) {
      res.status(500).json({ error: "Error adding RoleModule", details: error.message });
    }
  }

  // ✅ Actualizar relación
  async updateRoleModule(req, res) {
    try {
      const { Modules_fk, Roles_fk } = req.body;

      if (!Modules_fk || !Roles_fk) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let sqlQuery = `
        UPDATE role_modules 
        SET Modules_fk = ?, 
            Roles_fk = ?, 
            updated_at = ?
        WHERE RoleModules_id = ?
      `;

      const updated_at = new Date()
        .toLocaleString("en-CA", { timeZone: "America/Bogota" })
        .replace(",", "")
        .replace("/", "-")
        .replace("/", "-");

      const [result] = await connect.query(sqlQuery, [
        Modules_fk,
        Roles_fk,
        updated_at,
        req.params.id
      ]);

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "RoleModule not found" });

      res.status(200).json({
        data: [{ Modules_fk, Roles_fk, updated_at }],
        status: 200,
        updated: result.affectedRows
      });

    } catch (error) {
      res.status(500).json({ error: "Error updating RoleModule", details: error.message });
    }
  }

  // ✅ Eliminar relación
  async deleteRoleModule(req, res) {
    try {
      let sqlQuery = "DELETE FROM role_modules WHERE RoleModules_id = ?";

      const [result] = await connect.query(sqlQuery, [req.params.id]);

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "RoleModule not found" });

      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });

    } catch (error) {
      res.status(500).json({ error: "Error deleting RoleModule", details: error.message });
    }
  }

  // ✅ Mostrar todos
  async showRoleModules(res) {
    try {
      let sqlQuery = "SELECT * FROM role_modules";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching RoleModules", details: error.message });
    }
  }

  // ✅ Mostrar por ID
  async showRoleModuleById(res, req) {
    try {
      const [result] = await connect.query(
        "SELECT * FROM role_modules WHERE RoleModules_id = ?",
        [req.params.id]
      );

      if (result.length === 0)
        return res.status(404).json({ error: "RoleModule not found" });

      res.status(200).json(result[0]);

    } catch (error) {
      res.status(500).json({ error: "Error fetching RoleModule", details: error.message });
    }
  }
}

export default RoleModulesModel;