import React from 'react'
import ContentLoader from 'react-content-loader'

interface tableProps {
  columnWidth: number[]
  rowHeight?: number
  rowCounts?: string | number
}

export const TableContentLoaderWithProps = ({ columnWidth, rowCounts, rowHeight }: tableProps, props: object): JSX.Element => {
  const rows = rowCounts ?? 5
  const height = rowHeight ?? 50
  let spaceValue = 0
  const spaceArray = columnWidth?.map(item => {
    spaceValue += item + 0.1
    return spaceValue - item
  })

  return (
    <div className="mb-2" {...props}>
      {Array.from(Array(rows).keys()).map((_, i) => (
        <ContentLoader viewBox={`0 0 1500 ${height}`} key={i}>
          {columnWidth?.map((column, index) => (
            <React.Fragment key={index}>
              <rect
                x={`${spaceArray[index] + index}%`}
                y={height > 80 ? 30 : 20}
                rx="4"
                ry="4"
                width={`${column - 2}%`}
                height={height}
              />
            </React.Fragment>
          ))}
        </ContentLoader>
      ))}
    </div>
  )
}
