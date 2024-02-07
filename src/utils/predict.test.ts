import { expect, test } from 'vitest'
import { predict } from './predict'

const mockCards = [
  { suit: 1, number: 1 },
  { suit: 2, number: 2 },
  { suit: 3, number: 3 },
  { suit: 4, number: 4 }
]

test('Predict should be 7D', () => {
  const predictCard = predict(mockCards)
  expect(predictCard).toBe('7D')
})
