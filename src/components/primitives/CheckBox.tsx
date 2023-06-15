import React, { ReactNode } from 'react'

import styles from './CheckBox.module.css'

type Props = {
  label: ReactNode
  checked?: boolean
  onChange?: React.Dispatch<boolean>
}

const CheckBox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          style={{ marginRight: '5px' }}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span style={{ fontSize: '1.25rem' }}>{label}</span>
      </label>
    </div>
  )
}

export default CheckBox
