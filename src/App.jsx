import React, { useState, useEffect, useCallback } from 'react'
import { cards as ALL_CARDS, CATEGORIES, CATEGORY_COLORS } from './data'
import Card from './components/Card'
import Controls from './components/Controls'
import Progress from './components/Progress'
import Results from './components/Results'
import styles from './App.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(category, isShuffled) {
  let deck = category === 'All' ? [...ALL_CARDS] : ALL_CARDS.filter(c => c.category === category)
  return isShuffled ? shuffle(deck) : deck
}

const INITIAL = {
  category: 'All',
  isShuffled: false,
  deck: buildDeck('All', false),
  index: 0,
  flipped: false,
  knew: 0,
  missed: 0,
  skipped: 0,
  missedCards: [],
  done: false,
}

export default function App() {
  const [state, setState] = useState(INITIAL)

  const flip = useCallback(() => {
    setState(s => ({ ...s, flipped: !s.flipped }))
  }, [])

  const answer = useCallback((type) => {
    setState(s => {
      const card = s.deck[s.index]
      const knew = type === 'knew' ? s.knew + 1 : s.knew
      const missed = type === 'miss' ? s.missed + 1 : s.missed
      const skipped = type === 'skip' ? s.skipped + 1 : s.skipped
      const missedCards = type === 'miss' ? [...s.missedCards, card] : s.missedCards
      const nextIndex = s.index + 1
      const done = nextIndex >= s.deck.length
      return { ...s, knew, missed, skipped, missedCards, index: done ? s.index : nextIndex, flipped: false, done }
    })
  }, [])

  const setCategory = useCallback((category) => {
    setState(s => {
      const deck = buildDeck(category, s.isShuffled)
      return { ...INITIAL, category, isShuffled: s.isShuffled, deck }
    })
  }, [])

  const toggleShuffle = useCallback(() => {
    setState(s => {
      const isShuffled = !s.isShuffled
      const deck = buildDeck(s.category, isShuffled)
      return { ...INITIAL, category: s.category, isShuffled, deck }
    })
  }, [])

  const restart = useCallback(() => {
    setState(s => ({ ...INITIAL, category: s.category, isShuffled: s.isShuffled, deck: buildDeck(s.category, s.isShuffled) }))
  }, [])

  const retryMissed = useCallback(() => {
    setState(s => ({
      ...INITIAL,
      category: s.category,
      isShuffled: s.isShuffled,
      deck: s.missedCards,
    }))
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (state.done) return
      if (e.code === 'Space') { e.preventDefault(); flip() }
      if (e.key === 'ArrowUp') answer('knew')
      if (e.key === 'ArrowDown') answer('miss')
      if (e.key === 'ArrowRight') answer('skip')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state.done, flip, answer])

  const card = state.deck[state.index]

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.logo}>flash<span>.</span></h1>
          <div className={styles.headerRight}>
            <button
              className={`${styles.shuffleBtn} ${state.isShuffled ? styles.shuffleOn : ''}`}
              onClick={toggleShuffle}
              title="Shuffle deck"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 4h2.5a4 4 0 013.5 2m4-2h-1l2 2-2 2h1a4 4 0 01-4 4H5.5m0 0L4 13m1.5-1.5L7 13M1 11h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shuffle
            </button>
          </div>
        </header>

        {/* Category filters */}
        <nav className={styles.filters}>
          {CATEGORIES.map(cat => {
            const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS.All
            return (
              <button
                key={cat}
                className={`${styles.filterBtn} ${state.category === cat ? styles.filterActive : ''}`}
                style={state.category === cat ? { background: color.bg, color: color.text, borderColor: 'transparent' } : {}}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            )
          })}
        </nav>

        {/* Main content */}
        {state.done ? (
          <Results
            knew={state.knew}
            missed={state.missed}
            skipped={state.skipped}
            total={state.deck.length}
            missedCards={state.missedCards}
            onRestart={restart}
            onRetryMissed={retryMissed}
          />
        ) : (
          <>
            <Progress
              index={state.index}
              total={state.deck.length}
              knew={state.knew}
              missed={state.missed}
            />

            <Card
              card={card}
              flipped={state.flipped}
              onClick={flip}
              total={state.deck.length}
              index={state.index}
            />

            <Controls
              onKnew={() => answer('knew')}
              onMiss={() => answer('miss')}
              onSkip={() => answer('skip')}
              flipped={state.flipped}
            />

            <div className={styles.shortcuts}>
              <span>Space to flip</span>
              <span className={styles.dot} />
              <span>↑ knew it</span>
              <span className={styles.dot} />
              <span>↓ missed</span>
              <span className={styles.dot} />
              <span>→ skip</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
