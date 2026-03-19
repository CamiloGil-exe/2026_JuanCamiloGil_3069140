import ProfilesModel from '../models/profiles.model.js';

export const showProfiles = async (req, res) => {
  try {
    const profilesModel = new ProfilesModel();
    return profilesModel.showProfiles(res);
  } catch (error) {
    res.status(500).json({ 
      error: "Error fetching Profiles", 
      details: error.message 
    });
  }
};

export const showProfileId = async (req, res) => {
  try {
    const profilesModel = new ProfilesModel();
    return profilesModel.showProfileById(res, req);
  } catch (error) {
    res.status(500).json({ 
      error: "Error fetching Profile", 
      details: error.message 
    });
  }
};

export const addProfile = async (req, res) => {
  try {
    const profilesModel = new ProfilesModel();
    return profilesModel.addProfile(req, res);
  } catch (error) {
    res.status(500).json({
      error: "Error adding Profile",
      details: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profilesModel = new ProfilesModel();
    return profilesModel.updateProfile(req, res);
  } catch (error) {
    res.status(500).json({ 
      error: "Error updating Profile", 
      details: error.message 
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profilesModel = new ProfilesModel();
    return profilesModel.deleteProfile(req, res);
  } catch (error) {
    res.status(500).json({ 
      error: "Error deleting Profile", 
      details: error.message 
    });
  }
};