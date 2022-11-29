interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};


const calculator = (times: Array<number>, target: number): Results => {
  const periodLength = times.length;
  const trainingDays = times.filter(d => d > 0).length;
  const totalTraining = times.reduce((partial, x) => partial + x, 0);
  const average = totalTraining / periodLength
  const success = (average < target) ? false : true
  const rating = Math.round(average)
  
  let ratingDescription = 
    (rating < target) ? 'that did not go as planned...' :
    (rating === target) ? 'not too bad but could be better' :
    'very good!'
  

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

console.log(calculator([3, 0, 2, 4.5, 0, 3, 1], 2))