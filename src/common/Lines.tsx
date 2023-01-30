import React from 'react'
interface propTypes {
  linesWidth: Array<number>
}
const Lines = ({ linesWidth }: propTypes): JSX.Element => (
  <>
    {linesWidth?.map((item, index) => (
      <div key={index} className="line" style={{ width: `${item}%` }} />
    ))}
  </>
)

export default Lines
