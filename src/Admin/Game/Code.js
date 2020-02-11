import { pipe, prop, split, toUpper } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'

const renderChars = chars => (
  <>
    <h3>Code</h3>
    <p>Join this game with code:</p>
    <p className="h1 text-monospace">
      {chars.map((char, i) => (
        <Badge key={i} variant="primary" className="mx-1">
          {char}
        </Badge>
      ))}
    </p>
  </>
)

const Code = pipe(prop('code'), toUpper, split(''), renderChars)

export default Code
