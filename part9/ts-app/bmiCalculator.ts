type Result = string;

const check = (args: Array<string>): Array<number> | null => {
  try {
    const numberArgs = args.map(Number)
    return numberArgs
  }
  catch (error) {
    return null
  }
}

const parseArgs = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  let parsed = check(args.slice(2));

  if (parsed) {
    return parsed

  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number): Result => {
  if (height <= 0) throw new Error('Heigth cannot be less than 0')
  if (weight <= 0) throw new Error('Weight cannot be less than 0')

  const bmi: number = weight / ((height/100) ** 2)

  let message = 
    (bmi <= 16) ? 'Underweight (Severe thinness)' :
    (bmi <= 16.9) ? 'Underweight (Moderate thinness)' :
    (bmi <= 18.4) ? 'Underweight (Mild thinness)' :
    (bmi <= 24.9) ? 'Normal' :
    (bmi <= 29.9) ? 'Overweight' :
    (bmi <= 34.9) ? 'Obese (Class 1)' :
    (bmi <= 39.9) ? 'Obese (Class 2)' :
    'Obese (Class 3)'

  return message
}



try {
  const numberArgs = parseArgs(process.argv);
  console.log(calculateBmi(numberArgs[0], numberArgs[1]))
  
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
