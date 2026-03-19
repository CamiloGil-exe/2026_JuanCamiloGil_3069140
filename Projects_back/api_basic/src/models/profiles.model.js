import { connect } from '../config/db/connect.js';

class ProfilesModel {
  // ----------- helpers ----------
  async showProfiles(res) {
    try {
      const [result] = await connect.query("SELECT * FROM profiles");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Profiles", details: error.message });
    }
  }

  async showProfileById(res, req) {
    try {
      const [result] = await connect.query(
        "SELECT * FROM profiles WHERE Profile_id = ?",
        [req.params.id]
      );

      if (result.length === 0)
        return res.status(404).json({ error: "Profile not found" });

      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Profile", details: error.message });
    }
  }

  async addProfile(req, res) {
    try {
      const {
        name,
        last_name,
        document,
        email,
        phone,
        photo,
        address,
        document_type
      } = req.body;

      if (!name || !last_name || !document || !email || !document_type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const sqlQuery = `
        INSERT INTO profiles
        (Profile_name, Profile_last_name, Profile_document,
         Profile_email, Profile_phone, Profile_photo,
         Profile_address, Document_type_fk)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connect.query(sqlQuery, [
        name,
        last_name,
        document,
        email,
        phone,
        photo,
        address,
        document_type
      ]);

      res.status(201).json({
        message: "Profile created successfully",
        id: result.insertId
      });
    } catch (error) {
      res.status(500).json({
        error: "Error adding Profile",
        details: error.message
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const {
        name,
        last_name,
        document,
        email,
        phone,
        photo,
        address,
        document_type
      } = req.body;

      const updated_at = new Date()
        .toLocaleString("en-CA", { timeZone: "America/Bogota" })
        .replace(",", "")
        .replace("/", "-")
        .replace("/", "-");

      const sqlQuery = `
        UPDATE profiles
        SET Profile_name = ?,
            Profile_last_name = ?,
            Profile_document = ?,
            Profile_email = ?,
            Profile_phone = ?,
            Profile_photo = ?,
            Profile_address = ?,
            Document_type_fk = ?,
            updated_at = ?
        WHERE Profile_id = ?
      `;

      const [result] = await connect.query(sqlQuery, [
        name,
        last_name,
        document,
        email,
        phone,
        photo,
        address,
        document_type,
        updated_at,
        req.params.id
      ]);

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Profile not found" });

      res.status(200).json({ status: 200, updated: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error updating Profile", details: error.message });
    }
  }

  async deleteProfile(req, res) {
    try {
      const [result] = await connect.query(
        "DELETE FROM profiles WHERE Profile_id = ?",
        [req.params.id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Profile not found" });

      res.status(200).json({ status: 200, deleted: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Profile", details: error.message });
    }
  }
}


export default ProfilesModel;