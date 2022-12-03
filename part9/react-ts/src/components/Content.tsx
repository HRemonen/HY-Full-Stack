import { Parts } from "../types";

const Content = ({ parts }: Parts):JSX.Element => {
  return (
    <>
      {parts.map(part => (
        <div key={part.name}>
          <p>{part.name} {part.exerciseCount}</p>
        </div>
      ))}
    </>
  );
};

export default Content;