import patients from '../../data/patients';

import { SensitivePatient } from '../types';

const getPatients = (): Array<SensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

export default {
  getPatients
};