interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};


const checkArgs = (args: Array<string>): Array<number> | null => {
  try {
    const numberArgs = args.map(Number)
    return numberArgs
  }
  catch (error) {
    return null
  }
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  let parsed = checkArgs(args.slice(2));

  if (parsed) {
    return parsed

  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculator = (times: Array<number>, target: number): Results => {
  const periodLength = times.length;
  const trainingDays = times.filter(d => d > 0).length;
  const totalTraining = times.reduce((partial, x) => partial + x, 0);
  const average = totalTraining / periodLength;
  const success = (average < target) ? false : true;
  const rating = Math.round(average);
  
  let ratingDescription = 
    (rating < target) ? 'that did not go as planned...' :
    (rating === target) ? 'not too bad but could be better' :
    'very good!';
  

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

try {
  const numberArgs = parseArguments(process.argv);
  const args = numberArgs.slice(1, )
  const target = numberArgs[0]
  console.log(calculator(args, target))
  
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}