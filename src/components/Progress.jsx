import React from 'react'
import styles from './Progress.module.css'

export default function Progress({ index, total, knew, missed }) {
  const pct = Math.round((index / total) * 100)

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.count}>{index} <span className={styles.of}>of {total}</span></span>
        <div className={styles.pills}>
          <span className={styles.pill} style={{ color: 'var(--green)' }}>
            <span className={styles.dot} style={{ background: 'var(--green)' }} />
            {knew} known
          </span>
          <span className={styles.pill} style={{ color: 'var(--red)' }}>
            <span className={styles.dot} style={{ background: 'var(--red)' }} />
            {missed} missed
          </span>
        </div>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
