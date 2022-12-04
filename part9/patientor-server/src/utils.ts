import { Gender, NewPatient, NewEntry, EntryTypes, Entry, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing value');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isCode = (codes: unknown): codes is Array<string> => {
  return Array.isArray(codes) && codes.every(code => isString(code));
};

const parseCodes = (codes: unknown): Array<string> => {
  if(!codes || !isCode(codes)) {
    throw new Error('Incorrect codes: ' + codes);
  }
  return codes;
};

const isType = (param: any): param is EntryTypes => {
  return Object.values(EntryTypes).includes(param);
};

const parseType = (type: unknown): EntryTypes => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect type: ' + type);
  }
  return type;
};

const isRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  console.log(rating === undefined);
  if (!Number.isInteger(rating) || !isRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }

  return rating;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };
  return newEntry;
};

type EntryFields = { description: unknown, date: unknown, 
  specialist: unknown, diagnosisCodes?: unknown, type: unknown,
  discharge?: { date: unknown, criteria: unknown}, employerName?: unknown, 
  sickLeave?: { startDate: unknown, endDate: unknown }, healthCheckRating?: unknown }

const toNewEntry = (inputFields: EntryFields): NewEntry => {
      const newEntry = {
        date: parseDate(inputFields.date),
        specialist: parseString(inputFields.specialist),
        diagnosisCodes: parseCodes(inputFields.diagnosisCodes),
        description: parseString(inputFields.description),
      }

      const type = parseType(inputFields.type);

      switch (type) {
        case "Hospital":
          return {
            type,
            ...newEntry,
            discharge: {
              date: parseString(inputFields.discharge?.date),
              criteria: parseString(inputFields.discharge?.criteria)
            }
          }
        case "OccupationalHealthcare":
          return {
            type,
            ...newEntry,
            employerName: parseString(inputFields.employerName),
            sickLeave: {
              startDate: parseDate(inputFields.sickLeave?.startDate),
              endDate: parseDate(inputFields.sickLeave?.endDate)
            }
          }
        case "HealthCheck":
          return {
            type,
            ...newEntry,
            healthCheckRating: parseRating(inputFields.healthCheckRating)
          }
        default: return newEntry as Entry;
      }
  }

export default { toNewPatient, toNewEntry };