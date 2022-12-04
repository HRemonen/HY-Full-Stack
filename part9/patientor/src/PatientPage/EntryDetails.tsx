import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <p>
          <b>{entry.date}</b> &#x1F691; (Hospital visit) <br />
          patient left hospital on {entry.discharge.date} on criteria: {entry.discharge.criteria}
        </p>
      );
    case "OccupationalHealthcare":
      return (
        <p>
          <b>{entry.date}</b> &#x1F3E5; [{entry.employerName}] (Occupational healthcare) <br />
          patient sick leave time: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </p>

      );
    case "HealthCheck":
      return (
        <p>
          <b>{entry.date}</b> &#129523; (Health check)
        </p>
      );
  }
};

export default EntryDetails;