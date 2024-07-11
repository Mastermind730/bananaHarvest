// load a static image (from a directory)
import { useState } from 'react'
const heartEmpty = require('../assets/images/heart-empty.png')
const heartFull = require('../assets/images/heart-full.png')

const ToggleHeart = (props) => {
  const { onClick, currentStatus } = props

  const [status, setStatus] = useState(currentStatus)

  return (
    <button
      style={{ border: 'none', backgroundColor: 'transparent' }}
      onClick={() => {
        // toggle the status
        const newStatus = !status
        setStatus(newStatus)

        // let the caller take a decision
        onClick(newStatus)
      }}>
      <img
        alt='heart'
        style={{ width: 30, height: 30 }}
        src={status ? heartFull : heartEmpty}
      />
    </button>
  )
}

export default ToggleHeart
