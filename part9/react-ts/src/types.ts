interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface Parts {
  parts: Array<CourseParts>
}


export type { CourseParts, Parts }