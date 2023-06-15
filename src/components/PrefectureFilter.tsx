import React, { memo, useState } from 'react'

import CheckBox from './primitives/CheckBox'
import { usePrefectures } from '@/hooks/usePrefectures'
import { Prefecture } from '@/types/Prefecture'

type Props = {
  onUpdate?: React.Dispatch<Prefecture[]>
}

const PrefectureFilter: React.FC<Props> = memo(({ onUpdate }) => {
  const { prefs, error } = usePrefectures()
  const [filter, setFilter] = useState<Set<number>>(new Set())

  function handleChange(id: number, value: boolean) {
    // 選ばれている項目だけが Set に入っている
    if (value) {
      filter.add(id)
    } else {
      filter.delete(id)
    }
    setFilter(new Set(filter))
    onUpdate?.(prefs?.filter((p) => filter.has(p.prefCode)) ?? [])
  }

  return (
    <section>
      <h2>都道府県</h2>
      <hr />
      <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>
        {error ? (
          <>読み込みエラー</>
        ) : (
          prefs?.map((p) => (
            <CheckBox
              key={p.prefCode}
              label={p.prefName}
              checked={filter.has(p.prefCode)}
              onChange={handleChange.bind(null, p.prefCode)}
            />
          ))
        )}
      </div>
    </section>
  )
})

export default PrefectureFilter
