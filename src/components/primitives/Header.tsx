import React from 'react'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header style={styles}>
      <h1>都道府県別 総人口推移グラフ</h1>
    </header>
  )
}

export default Header
