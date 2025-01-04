import {Consultation} from '../models/ConsultationCall.js'
export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
   
    
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving consultations', error: error.message });
  }
};




import { Psychologist } from '../models/Psychologist.js';
// Controller to fetch all registered psychologists
export const getAllPsychologists = async (req, res) => {
  try {
    const psychologists = await Psychologist.find();
    res.status(200).json({
      success: true,
      data: psychologists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch psychologists',
      error: error.message,
    });
  }
};



// Controller to fetch consultations for a specific psychologist
export const getConsultationsByPsychologist = async (req, res) => {
  const { id } = req.params; // Psychologist ID
  try {
    const consultations = await Consultation.find({ psychologist: id })
      .populate('user', 'name email') // Populate user details (name, email)
      .populate('psychologist', 'name email'); // Populate psychologist details (optional)

    if (!consultations || consultations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No consultations found for the selected psychologist',
      });
    }

    res.status(200).json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations',
      error: error.message,
    });
  }
};



// Inactivate a psychologist by ID
export const inactivatePsychologist = async (req, res) => {
  console.log("in inactivate psychologist")
  try {
    const { psychologistId } = req.params;
    console.log(psychologistId)

    
    const psychologist = await Psychologist.findByIdAndUpdate(
      psychologistId,
      { isActive: false },
      { new: true } 
    );

    if (!psychologist) {
      return res.status(404).json({ success: false, message: 'Psychologist not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Psychologist successfully inactivated',
      data: psychologist,
    });
  } catch (error) {
    console.error('Error inactivating psychologist:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};




