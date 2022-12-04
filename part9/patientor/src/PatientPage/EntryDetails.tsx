import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <p>
          <b>{entry.date}</b> &#x1F691; (Hospital visit)
          patient left hospital on {entry.discharge}
        </p>
      );
    case "OccupationalHealthcare":
      return (
        <p>
          <b>{entry.date}</b> &#x1F3E5; [{entry.employerName}] (Occupational healthcare) <br />
          patient sick leave time: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </p>

      );
    default:
      return (
        <p>
          <b>{entry.date}</b> &#129523; (Health check)
        </p>
      );
  }
};

export default EntryDetails;