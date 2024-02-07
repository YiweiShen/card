import { useState } from 'react'
import numbers from './data/numbers.json'
import suits from './data/suits.json'
import { predict } from './utils/predict'
import { Card } from './interfaces'

import './App.css'

function App() {
  const CARD_NUMBER = 4
  const [cards, setCards] = useState<Card[]>([])
  const [suit, setSuit] = useState<number>(0)
  const [predictCard, setPredictCard] = useState<string>('back')

  const handleCard = (number: number, suit: number) => {
    const newCard = {
      suit,
      number
    }
    setCards([...cards, newCard])
    setSuit(0)
  }

  const handlePredict = () => {
    const p = predict(cards)
    setPredictCard(p)
  }

  const handleClear = () => {
    setCards([])
    setSuit(0)
    setPredictCard('back')
  }

  return (
    <div className="App">
      {/* Show selected cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card, index) => {
          const number = numbers.find((n) => n.value === card.number)?.short
          const suit = suits.find((s) => s.value === card.suit)?.short
          return (
            <div key={`${number}${suit}${index}`} style={{ margin: '0 10px' }}>
              <img
                src={`/card/${number}${suit}.png`}
                alt={`${number}${suit}`}
                width={100}
                height={130}
              ></img>
            </div>
          )
        })}
      </div>

      {/* Buttons for inputing */}
      <div hidden={cards.length === CARD_NUMBER}>
        {suits.map((s) => (
          <button
            key={s.value}
            onClick={() => setSuit(s.value)}
            style={{ margin: '0 10px' }}
            hidden={suit !== 0}
          >
            {s.long}
          </button>
        ))}
        {numbers.map((n) => (
          <button
            key={n.value}
            onClick={() => handleCard(n.value, suit)}
            style={{ margin: '0 10px' }}
            hidden={suit === 0}
          >
            {n.long}
          </button>
        ))}
      </div>

      {/* Show predicted card */}
      <div hidden={cards.length < CARD_NUMBER}>
        <img src={`/card/${predictCard}.png`} alt="predict card"></img>
      </div>

      {/* Reset and Predict buttons */}
      <button onClick={handleClear} hidden={cards.length < CARD_NUMBER}>
        Reset
      </button>

      <button
        onClick={() => handlePredict()}
        hidden={cards.length < CARD_NUMBER}
      >
        Predict
      </button>
    </div>
  )
}

export default App
