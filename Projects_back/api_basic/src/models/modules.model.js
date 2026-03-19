import { connect } from '../config/db/connect.js';

class ModulesModel {

  async showModules(res) {
    try {
      const [result] = await connect.query("SELECT * FROM modules");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Modules", details: error.message });
    }
  }

  async showModuleById(res, req) {
    try {
      const [result] = await connect.query(
        "SELECT * FROM modules WHERE Modules_id = ?",
        [req.params.id]
      );

      if (result.length === 0)
        return res.status(404).json({ error: "Module not found" });

      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Module", details: error.message });
    }
  }

  async addModule(req, res) {
    try {
      const {
        Modules_name,
        Modules_description,
        Modules_route,
        Modules_icon,
        Modules_submodule,
        Modules_parent_module
      } = req.body;

      if (!Modules_name || !Modules_route) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const sqlQuery = `
        INSERT INTO modules 
        (Modules_name, Modules_description, Modules_route, Modules_icon, Modules_submodule, Modules_parent_module)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connect.query(sqlQuery, [
        Modules_name,
        Modules_description,
        Modules_route,
        Modules_icon,
        Modules_submodule,
        Modules_parent_module
      ]);

      res.status(201).json({
        data: [{ id: result.insertId, Modules_name }],
        status: 201
      });

    } catch (error) {
      res.status(500).json({ error: "Error adding Module", details: error.message });
    }
  }

  async updateModule(req, res) {
    try {
      const {
        Modules_name,
        Modules_description,
        Modules_route,
        Modules_icon,
        Modules_submodule,
        Modules_parent_module
      } = req.body;

      const updated_at = new Date()
        .toLocaleString("en-CA", { timeZone: "America/Bogota" })
        .replace(",", "")
        .replace("/", "-")
        .replace("/", "-");

      const sqlQuery = `
        UPDATE modules 
        SET Modules_name = ?, 
            Modules_description = ?, 
            Modules_route = ?, 
            Modules_icon = ?, 
            Modules_submodule = ?, 
            Modules_parent_module = ?, 
            updated_at = ?
        WHERE Modules_id = ?
      `;

      const [result] = await connect.query(sqlQuery, [
        Modules_name,
        Modules_description,
        Modules_route,
        Modules_icon,
        Modules_submodule,
        Modules_parent_module,
        updated_at,
        req.params.id
      ]);

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Module not found" });

      res.status(200).json({
        status: 200,
        updated: result.affectedRows
      });

    } catch (error) {
      res.status(500).json({ error: "Error updating Module", details: error.message });
    }
  }

  async deleteModule(req, res) {
    try {
      const [result] = await connect.query(
        "DELETE FROM modules WHERE Modules_id = ?",
        [req.params.id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Module not found" });

      res.status(200).json({
        status: 200,
        deleted: result.affectedRows
      });

    } catch (error) {
      res.status(500).json({ error: "Error deleting Module", details: error.message });
    }
  }
}

export default ModulesModel;