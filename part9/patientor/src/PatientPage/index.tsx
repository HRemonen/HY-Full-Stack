import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue, addPatientInfo } from '../state';
import { Entry, Patient } from '../types';
import { apiBaseUrl } from "../constants";

type Params = {
  id: string;
};

const PatientPage = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
  const { id } = useParams() as Params;

  const patient = patientInfo[id];
  const entries = patient
    ? patient.entries
    : [];

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
    <div>
      <h1>{patient.name} ({patient.gender})</h1>
      <p>
        ssn: { patient.ssn } <br />
        occupation: { patient.occupation }
      </p>

      {entries.length > 0 &&
        <ul>
          <h3>Patient entries</h3>
          {Object.values(entries).map((e: Entry) => (
            <li key={e.id}>
              <p>
                {e.description} <br />
                Diagnosis codes: {e.diagnosisCodes?.join(', ')}
              </p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default PatientPage;