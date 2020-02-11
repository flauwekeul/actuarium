import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Numbers from '../../Game/Numbers'
import Rules from '../../Game/Rules'

const ActiveGame = ({ round }) => (
  <>
    <h1 className="display-3">Round {round}</h1>
    <Row>
      <Col sm="4">
        <Rules />
      </Col>
      <Col sm="8">
        <Numbers />
      </Col>
    </Row>
  </>
)

export default ActiveGame
