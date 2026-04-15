import React from 'react'
import styles from './Controls.module.css'

export default function Controls({ onKnew, onMiss, onSkip, flipped }) {
  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.btn} ${styles.miss}`}
        onClick={onMiss}
        title="Didn't know it (↓)"
        disabled={!flipped}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Missed
      </button>

      <button
        className={`${styles.btn} ${styles.skip}`}
        onClick={onSkip}
        title="Skip (→)"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Skip
      </button>

      <button
        className={`${styles.btn} ${styles.knew}`}
        onClick={onKnew}
        title="Knew it (↑)"
        disabled={!flipped}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9.5l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Knew it
      </button>
    </div>
  )
}
