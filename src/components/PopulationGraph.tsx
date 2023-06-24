import React, { useLayoutEffect, useState } from 'react'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import Dropdown from './primitives/Dropdown'
import { usePopulationCompositions } from '@/hooks/usePopulationComposition'
import { Prefecture } from '@/types/Prefecture'
import { randomColor } from '@/utils/randomColor'

import styles from './PopulationGraph.module.css'

type Props = {
  prefectures: Prefecture[]
}

const PopulationGraph: React.FC<Props> = ({ prefectures }) => {
  const { comps, size, setSize } = usePopulationCompositions(
    prefectures.map((p) => p.prefCode)
  )

  useLayoutEffect(() => {
    // ブラウザの描画処理開始前に、
    // 指定された都道府県の人口構成を一気に読み込む
    if (size !== prefectures.length) {
      setSize(prefectures.length)
    }
  }, [size, prefectures.length, setSize])

  const [activeLabel, setActiveLabel] = useState<string>()
  // 人口構成データから総人口、年少人口などのラベルを抽出、Set で重複除去
  const labels = [
    ...new Set(comps?.flatMap((p) => p?.data.map((c) => c.label) ?? [])),
  ]
  // Recharts レスポンシブ対応
  // https://github.com/recharts/recharts/issues/172#issuecomment-1282264047
  return (
    <section style={{ display: 'flex' }}>
      <div style={{ flex: 1, width: 0, height: '65vh' }}>
        <Dropdown
          options={labels}
          value={activeLabel}
          onChange={setActiveLabel}
        />
        <ResponsiveContainer>
          <LineChart
            margin={{
              top: 10,
              right: 0,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis dataKey="value" allowDataOverflow={false} />
            <Tooltip labelClassName={styles.recharts_label} />
            <Legend />
            {comps?.length === prefectures.length ? (
              comps?.map((c, i) => {
                const compData = // 指定があればその区分の人口構成を、
                // なければ総人口を表示
                (c?.data.filter((c) => c.label == activeLabel)[0] ?? c?.data[0])
                  ?.data
                return (
                  <Line
                    key={prefectures[i].prefCode}
                    dataKey="value"
                    data={compData}
                    name={prefectures[i].prefName}
                    stroke={randomColor()}
                  />
                )
              })
            ) : (
              <></>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default PopulationGraph
