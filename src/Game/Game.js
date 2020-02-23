import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Numbers from './Numbers'
import Round from './Round'
import Rules from './Rules'

const Game = ({ round, controls }) => (
  <>
    <Round round={round} />
    <Row className="mb-3">
      <Col md="5">
        <Rules />
        {controls}
      </Col>
      <Col md="7">
        <Numbers />
      </Col>
    </Row>
  </>
)

export default Game
