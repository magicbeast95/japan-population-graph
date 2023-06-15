import React from 'react'

type Props = {
  options: string[]
  value?: string
  onChange?: React.Dispatch<string>
}

const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  return options.length ? (
    <select value={value} onChange={(e) => onChange?.(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  ) : (
    <></>
  )
}

export default Dropdown
