import Part from "./Part";

import { Parts } from "../types";

const Content = ({ parts }: Parts):JSX.Element => {
  return (
    <>
      {parts.map(part => (
        <div key={part.name}>
          <Part part={part}/>
        </div>
      ))}
    </>
  );
};

export default Content;