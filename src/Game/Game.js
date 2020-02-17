import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Numbers from './Numbers'
import Round from './Round'
import Rules from './Rules'

const Game = ({ round }) => (
  <>
    <Round round={round} />
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
