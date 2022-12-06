import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: {entry: Entry, id: string};
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSE";
      payload: Diagnosis;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_PATIENT_INFO":
        return {
          ...state,
          patientInfo: {
            ...state.patientInfo,
            [action.payload.id]: action.payload
          }
        };
      case "ADD_PATIENT_ENTRY":
        const patient = state.patientInfo[action.payload.id];
        patient.entries.push(action.payload.entry);

        return {
          ...state,
          patientInfo: {
            ...state.patientInfo,
            [action.payload.id]: patient
          }
        };

      case "SET_DIAGNOSES_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnoses
          }
        };
      case "ADD_DIAGNOSE":
        return {
          ...state,
          diagnoses: {
            ...state.diagnoses,
            [action.payload.code]: action.payload
          }
        };
    default:
      return state;
  }
};

export const setPatientList = (payload: Array<Patient>): Action => {
  return { type: 'SET_PATIENT_LIST', payload };
};

export const addPatient = (payload: Patient): Action => {
  return { type: 'ADD_PATIENT', payload };
};

export const addPatientInfo = (payload: Patient): Action => {
  return { type: 'ADD_PATIENT_INFO', payload };
};

export const addPatientEntry = (payload: Entry, id: string): Action => {
  return { type: 'ADD_PATIENT_ENTRY', payload: { entry: payload, id } };
};

export const setDiagnosesList = (payload: Array<Diagnosis>): Action => {
  return { type: 'SET_DIAGNOSES_LIST', payload };
};

export const addDiagnose = (payload: Diagnosis): Action => {
  return { type: 'ADD_DIAGNOSE', payload };
};

