import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './exerciseCalculator';
const app = express();
app.use(express.json())

interface exercises {
  daily_exercises: Array<number>,
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryObject = req.query;

  if (!queryObject) {
    return res.status(400).json({ error: 'Missing input values'});
  }

  const height = Number(queryObject.height);
  const weight = Number(queryObject.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters'});
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as exercises;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  };
  let results;

  
  const trainingDays = daily_exercises.map(Number);
  const targetValue = Number(target)
  
  const findNans = () => trainingDays.some(x => isNaN(Number(x)))

  if (findNans() || isNaN(targetValue)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }
  results = calculator(trainingDays, targetValue)

  return res.json({ results });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});