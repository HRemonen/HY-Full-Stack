import { SinglePart } from "../types";

const Part = ({ part }: SinglePart) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br />
          <i>{part.description}</i>
        </p>
      );
    
    case "submission":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br />
          <i>{part.description}</i> <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );

    case "groupProject":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    
    case "special":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b> <br />
          <i>{part.description}</i> <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
  }
};

export default Part;