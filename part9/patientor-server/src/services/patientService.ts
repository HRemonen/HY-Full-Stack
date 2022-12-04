import patients from '../../data/patients';

import { SensitivePatient, Patient, NewPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';


const getPatients = (): Array<SensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = ( entry: NewEntry, patientId: string ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patients.findIndex(p => p.id === patientId);
  patients[patient].entries.push(newEntry);
  return newEntry;
}

export default {
  getPatients,
  getPatient,
  addPatient,
  addPatientEntry
};