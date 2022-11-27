type Result = string;

const calculateBmi = (height: number, weight: number): Result => {
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


console.log(calculateBmi(180, 74))