import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Consumer from './Consumer'
import Insurer from './Insurer'
import Numbers from './Numbers'
import Round from './Round'
import Rules from './Rules'

const controlsForRole = role => (role === 'insurer' ? <Insurer /> : <Consumer />)

const Game = ({ round, player }) => (
  <>
    <Round round={round} />
    <Row className="mb-3">
      <Col md="5">
        <Rules />
        <div className="mt-3">{controlsForRole(player.role)}</div>
      </Col>
      <Col md="7">
        <Numbers />
      </Col>
    </Row>
  </>
)

export default Game
