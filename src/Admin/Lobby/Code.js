import { pipe, prop, split, toUpper } from 'ramda'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

const renderChars = chars => (
  <Card>
    <Card.Header as="h3">Code</Card.Header>
    <Card.Body>
      <p>Join this game with code:</p>
      <p className="h1 text-monospace">
        {chars.map((char, i) => (
          <Badge key={i} variant="secondary" className="mx-1">
            {char}
          </Badge>
        ))}
      </p>
    </Card.Body>
  </Card>
)

const Code = pipe(prop('code'), toUpper, split(''), renderChars)

export default Code
