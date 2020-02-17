import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Round = ({ round }) => {
  const now = Math.round((round / 6) * 100)
  const label = `${round}/6`
  return (
    <>
      <h1 className="display-3">Round {round}</h1>
      <ProgressBar now={now} label={label} variant="info" className="mb-3" />
    </>
  )
}

export default Round
