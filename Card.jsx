import React from 'react'
import styles from './Card.module.css'
import { CATEGORY_COLORS } from '../data'

export default function Card({ card, flipped, onClick, total, index }) {
  const color = CATEGORY_COLORS[card.category] || CATEGORY_COLORS.All

  return (
    <div className={styles.scene} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.code === 'Space' && (e.preventDefault(), onClick())}
      aria-label={flipped ? `Answer: ${card.answer}` : `Question: ${card.question}`}
    >
      <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>

        {/* Front */}
        <div className={styles.face}>
          <div className={styles.faceInner}>
            <span className={styles.badge} style={{ background: color.bg, color: color.text }}>
              {card.category}
            </span>
            <div className={styles.label}>Question</div>
            <p className={styles.questionText}>{card.question}</p>
            <div className={styles.flipHint}>
              <span className={styles.hintDot} />
              <span className={styles.hintDot} />
              <span className={styles.hintDot} />
              <span className={styles.hintLabel}>tap to flip</span>
            </div>
          </div>
          <div className={styles.cardNum}>{index + 1} / {total}</div>
        </div>

        {/* Back */}
        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.faceInner}>
            <span className={styles.badge} style={{ background: color.bg, color: color.text }}>
              {card.category}
            </span>
            <div className={styles.label}>Answer</div>
            <p className={styles.answerText}>{card.answer}</p>
          </div>
          <div className={styles.cardNum}>{index + 1} / {total}</div>
        </div>

      </div>
    </div>
  )
}
