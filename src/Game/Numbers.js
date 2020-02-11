import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

const Numbers = () => (
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
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
          <tr>
            <td>B</td>
            <td>5%</td>
            <td>€10,000</td>
            <td>
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
          <tr>
            <td>C</td>
            <td>10%</td>
            <td>€10,000</td>
            <td>
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
          <tr>
            <td>D</td>
            <td>15%</td>
            <td>€10,000</td>
            <td>
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
          <tr>
            <td>E</td>
            <td>20%</td>
            <td>€10,000</td>
            <td>
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
          <tr>
            <td>F</td>
            <td>25%</td>
            <td>€10,000</td>
            <td>
              <Form.Control type="number" size="sm" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3" className="text-right">
              Average expected expenses:
            </th>
            <th>{/* todo: sum */}</th>
          </tr>
        </tfoot>
      </Table>
    </Card.Body>
  </Card>
)

export default Numbers
