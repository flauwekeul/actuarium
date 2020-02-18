import { is, mean, repeat, update } from 'ramda'
import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

const Numbers = () => {
  const [{ average }, setData] = useState({ numbers: repeat(null, 6), average: null })

  const calculateAverage = index => ({ target }) =>
    setData(prevState => {
      const numbers = update(index, Number(target.value), prevState.numbers)
      const average = Math.round(mean(numbers))
      return { ...prevState, numbers, average }
    })

  return (
    <Card>
      <Card.Header as="h3">Data</Card.Header>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th>Consumer type</th>
              <th>Risk</th>
              <th>Medical expenses</th>
              <th>Expected expenses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>0%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(0)} />
              </td>
            </tr>
            <tr>
              <td>B</td>
              <td>5%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(1)} />
              </td>
            </tr>
            <tr>
              <td>C</td>
              <td>10%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(2)} />
              </td>
            </tr>
            <tr>
              <td>D</td>
              <td>15%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(3)} />
              </td>
            </tr>
            <tr>
              <td>E</td>
              <td>20%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(4)} />
              </td>
            </tr>
            <tr>
              <td>F</td>
              <td>25%</td>
              <td>€10,000</td>
              <td>
                <Form.Control type="number" size="sm" onChange={calculateAverage(5)} />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3" className="text-right">
                Average expected expenses:
              </th>
              <th>{is(Number, average) && `€${average}`}</th>
            </tr>
          </tfoot>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default Numbers
