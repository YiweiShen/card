import numbers from '../data/numbers.json'
import suits from '../data/suits.json'
import { Combination, Card } from '../interfaces'

export const predict = (cards: Card[]) => {
  const predictSuit = suits.find((s) => s.value === cards[0].suit)?.short

  const cardValue2 = cards[1].suit * 100 + cards[1].number
  const cardValue3 = cards[2].suit * 100 + cards[2].number
  const cardValue4 = cards[3].suit * 100 + cards[3].number

  const indexedCards = [cardValue2, cardValue3, cardValue4].map(
    (num: number, i: number) => [num, i]
  )

  const sortedCards = indexedCards.sort((a, b) => b[0] - a[0])
  const originalIndices = sortedCards.map((num) => num[1]).join('')

  const combinations: Combination = {
    '012': 1,
    '021': 2,
    '102': 3,
    '201': 4,
    '120': 5,
    '210': 6
  }

  const diffNumber = combinations[originalIndices]

  const predictNumber = numbers.find(
    (n) => n.value === cards[0].number + diffNumber
  )?.short

  return `${predictNumber}${predictSuit}`
}

export default predict
