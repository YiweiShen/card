import { useState } from 'react'
import numbers from './data/numbers.json'
import suits from './data/suits.json'
import { predict } from './utils/predict'
import { Card } from './interfaces'

import './App.css'

const SUIT_GLYPH: Record<string, string> = {
  S: '♠',
  H: '♥',
  C: '♣',
  D: '♦'
}

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

  const isComplete = cards.length === CARD_NUMBER
  const isRevealed = predictCard !== 'back'
  const activeSuit = suits.find((s) => s.value === suit)

  return (
    <div className="App">
      <header className="hero">
        <h1>Mind Reading</h1>
        <p className="tagline">Pick four cards. I'll reveal the fifth.</p>
      </header>

      {/* Progress: 4 card slots */}
      <div className="slots" aria-label="Selected cards">
        {Array.from({ length: CARD_NUMBER }).map((_, index) => {
          const card = cards[index]
          if (!card) {
            return (
              <div
                key={`slot-${index}`}
                className="slot slot-empty"
                aria-label={`Slot ${index + 1} empty`}
              >
                <span className="slot-index">{index + 1}</span>
              </div>
            )
          }
          const number = numbers.find((n) => n.value === card.number)?.short
          const s = suits.find((su) => su.value === card.suit)?.short
          return (
            <div key={`${number}${s}${index}`} className="slot slot-filled">
              <img
                src={`/card/${number}${s}.png`}
                alt={`${number}${s}`}
                loading="lazy"
              />
            </div>
          )
        })}
      </div>

      {/* Step indicator */}
      {!isComplete && (
        <p className="step-hint" aria-live="polite">
          {suit === 0 ? (
            <>
              Step <strong>{cards.length + 1}</strong> of {CARD_NUMBER} &middot;{' '}
              Choose a suit
            </>
          ) : (
            <>
              Step <strong>{cards.length + 1}</strong> of {CARD_NUMBER} &middot;{' '}
              Choose a value for{' '}
              <span
                className={`inline-suit suit-${activeSuit?.short.toLowerCase()}`}
              >
                {SUIT_GLYPH[activeSuit?.short || '']} {activeSuit?.long}
              </span>
            </>
          )}
        </p>
      )}

      {/* Picker area */}
      {!isComplete && (
        <div className="picker">
          {suit === 0 && (
            <div className="suit-grid" role="group" aria-label="Pick a suit">
              {suits.map((s) => {
                const code = s.short.toLowerCase()
                return (
                  <button
                    key={s.value}
                    type="button"
                    className={`suit-btn suit-${code}`}
                    onClick={() => setSuit(s.value)}
                  >
                    <span className="suit-glyph" aria-hidden="true">
                      {SUIT_GLYPH[s.short]}
                    </span>
                    <span className="suit-label">{s.long}</span>
                  </button>
                )
              })}
            </div>
          )}

          {suit !== 0 && (
            <>
              <div
                className="number-grid"
                role="group"
                aria-label="Pick a value"
              >
                {numbers.map((n) => {
                  const taken = !!cards.find(
                    (c) => c.number === n.value && c.suit === suit
                  )
                  return (
                    <button
                      key={n.value}
                      type="button"
                      className={`number-btn suit-${
                        activeSuit?.short.toLowerCase() || ''
                      }`}
                      onClick={() => handleCard(n.value, suit)}
                      disabled={taken}
                      aria-label={`${n.long} of ${activeSuit?.long}`}
                    >
                      {n.long}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setSuit(0)}
              >
                &larr; Back to suits
              </button>
            </>
          )}
        </div>
      )}

      {/* Predicted card */}
      {isComplete && (
        <div className="reveal">
          <div className={`reveal-card ${isRevealed ? 'is-flipped' : ''}`}>
            <img
              src={`/card/${predictCard}.png`}
              alt={isRevealed ? `Predicted ${predictCard}` : 'Hidden card'}
            />
          </div>
          <p className="reveal-caption">
            {isRevealed
              ? 'Your card has been revealed.'
              : 'Tap Predict to see your card.'}
          </p>
        </div>
      )}

      {/* Action bar */}
      {isComplete && (
        <div className="actions">
          <button
            type="button"
            className="action-btn secondary"
            onClick={handleClear}
          >
            Reset
          </button>
          <button
            type="button"
            className="action-btn primary"
            onClick={() => handlePredict()}
            disabled={isRevealed}
          >
            {isRevealed ? 'Revealed' : 'Predict'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
