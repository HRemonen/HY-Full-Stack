import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from "../constants";

type Params = {
  id: string;
};

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<Params>() as Params;

  const patient = patients[id];

  console.log("patient: ", patient);
  console.log("id: ", id);

  useEffect(() => {
    if (!patient) void getPatientInfo();
  }, []);

  const getPatientInfo = async () => {
    try {
      const { data: newPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };
  if (!patient) return null;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>
        ssn: { patient.ssn } <br />
        occupation: { patient.occupation }
      </p>
    </div>
    
  );
};

export default PatientPage;