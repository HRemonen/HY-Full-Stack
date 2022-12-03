import { Parts } from "../types";

const Total = ({ parts }: Parts): JSX.Element => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;