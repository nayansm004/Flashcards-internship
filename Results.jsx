import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import styles from './Results.module.css'

export default function Results({ knew, missed, skipped, total, missedCards, onRestart, onRetryMissed }) {
  const pct = Math.round((knew / total) * 100)

  useEffect(() => {
    if (pct >= 70) {
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.5 },
        colors: ['#e8c84a', '#3dba7e', '#38bfbf', '#e87d3e'] })
    }
  }, [])

  const grade = pct >= 90 ? 'Excellent' : pct >= 70 ? 'Good job' : pct >= 50 ? 'Keep going' : 'Keep studying'

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.scoreRing}>
          <svg viewBox="0 0 100 100" width="110" height="110">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface2)" strokeWidth="8"/>
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <text x="50" y="46" textAnchor="middle" fill="var(--text)" fontSize="22" fontWeight="700" fontFamily="Syne, sans-serif">{pct}%</text>
            <text x="50" y="62" textAnchor="middle" fill="var(--text-3)" fontSize="10" fontFamily="DM Sans, sans-serif">score</text>
          </svg>
        </div>
        <div>
          <h2 className={styles.grade}>{grade}</h2>
          <p className={styles.sub}>You answered {knew} of {total} cards correctly</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statN} style={{ color: 'var(--green)' }}>{knew}</span>
          <span className={styles.statL}>Knew it</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statN} style={{ color: 'var(--red)' }}>{missed}</span>
          <span className={styles.statL}>Missed</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statN} style={{ color: 'var(--text-2)' }}>{skipped}</span>
          <span className={styles.statL}>Skipped</span>
        </div>
      </div>

      {missedCards.length > 0 && (
        <div className={styles.weak}>
          <h3 className={styles.weakTitle}>Review these</h3>
          <div className={styles.weakList}>
            {missedCards.map(c => (
              <div key={c.id} className={styles.weakItem}>
                <span className={styles.weakCat}>{c.category}</span>
                <span className={styles.weakQ}>{c.question}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        {missedCards.length > 0 && (
          <button className={`${styles.actionBtn} ${styles.retry}`} onClick={onRetryMissed}>
            Retry missed ({missedCards.length})
          </button>
        )}
        <button className={`${styles.actionBtn} ${styles.restart}`} onClick={onRestart}>
          Start over
        </button>
      </div>
    </div>
  )
}
