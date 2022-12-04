import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue, addPatientInfo } from '../state';
import { Entry, Patient } from '../types';
import { apiBaseUrl } from "../constants";

import EntryDetails from './EntryDetails';

type Params = {
  id: string;
};

const PatientPage = () => {
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams() as Params;

  const patient = patientInfo[id];
  const entries = patient
    ? patient.entries
    : [];

  console.log(diagnoses);

  useEffect(() => {
    if (!patient) void getPatientInfo();
  }, []);

  const getPatientInfo = async () => {
    try {
      const { data: newPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatientInfo(newPatient));

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  if (!patient) return <h1>No patient found with given id</h1>;
  return (
    <div className='patient-wrapper'>
      <h1 className='patient-heading'>{patient.name} ({patient.gender})</h1>
      <p className='patient-info'>
        ssn: { patient.ssn } <br />
        occupation: { patient.occupation }
      </p>
      {entries.length > 0 &&
        <div className='patient-entries-wrapper'>
          <h3>Patient entries</h3>
          {Object.values(entries).map((e: Entry) => (
            <div key={e.id} className="patient-entry-wrapper">
              <EntryDetails entry={e} />
              <p>
                <i>{e.description}</i> <br />
                diagnosed by {e.specialist}
              </p>
              
              <ul className='patient-entry-diagnoses'>
                {e.diagnosisCodes?.map(code => {
                  const diagnose = diagnoses[code];
                  return (
                    <li key={code}>
                      {code}: {diagnose.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default PatientPage;