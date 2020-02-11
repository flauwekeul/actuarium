import React from 'react'
import Card from 'react-bootstrap/Card'

const Rules = () => (
  <Card>
    <Card.Header as="h3">Rules</Card.Header>
    <Card.Body>
      <ul>
        <li>
          The consumer <strong>does not</strong> know in which risk group she's in.
        </li>
        <li>
          The consumer <strong>is not</strong> obligated to take out insurance.
        </li>
        <li>
          The insurer <strong>does not</strong> know in which risk group the consumer's in.
        </li>
        <li>
          Insurers may request differentiated premiums and <strong>do not</strong> have to make these known to other
          insurers.
        </li>
      </ul>
    </Card.Body>
  </Card>
)

export default Rules
