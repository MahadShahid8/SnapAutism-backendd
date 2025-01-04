import express from "express";
const router = express.Router();
import {getAllPsychologists,getConsultationsByPsychologist,getAllConsultations,inactivatePsychologist} from '../controllers/ConsultationManagementController.js'
import {getUsers} from '../controllers/users.js'

router.get('/psychologists', getAllPsychologists);

// Route to get consultations by psychologist ID
router.get('/psychologists/:id/consultations', getConsultationsByPsychologist);


router.get('/getUser',getUsers)
router.get('/getConsultations',getAllConsultations)
router.put('/psychologists/inactivate/:psychologistId',inactivatePsychologist)


export {router as ConsultationManagmentRouter}
