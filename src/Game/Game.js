import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Numbers from './Numbers'
import Rules from './Rules'

const Game = ({ round }) => (
  <>
    <h1 className="display-3">Round {round}</h1>
    <Row>
      <Col md="4" className="mb-3">
        <Rules />
      </Col>
      <Col md="8">
        <Numbers />
      </Col>
    </Row>
  </>
)

export default Game
