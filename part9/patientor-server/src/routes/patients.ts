import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const patientToShow = patientService.getPatient(id)
  console.log(patientToShow)

  if (patientToShow === undefined || !patientToShow) {
    res.status(400).json({ error: "no patient found by given id" })
  }
  res.json(patientToShow)
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } 
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addPatientEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } 
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;