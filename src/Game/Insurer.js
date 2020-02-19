import { Formik } from 'formik'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDispatch, useSelector } from 'react-redux'
import { saveGame } from '../state/actions'
import { getInputForRound } from '../state/selectors'

const Insurer = () => {
  // todo: don't hard-code round
  const premium = useSelector(getInputForRound(1))
  const dispatch = useDispatch()

  const submit = ({ premium: input }) => dispatch(saveGame({ input }))

  const showLastSaved = values => !!(premium && premium !== values.premium)

  return (
    <Card>
      <Card.Header as="h3">Input</Card.Header>
      <Card.Body>
        <p>
          Which premium do you want to offer?
          <br />
          <span className="text-muted">You can change this until the teacher ends the round.</span>
        </p>
        <Formik initialValues={{ premium }} onSubmit={submit}>
          {({ values, errors, touched, handleChange, handleSubmit, isValidating, isSubmitting }) => (
            <Form noValidate inline onSubmit={handleSubmit}>
              <Form.Group controlId="premium">
                <Form.Label srOnly>Premium</Form.Label>
                <InputGroup className="mr-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    min="0"
                    step="500"
                    size="lg"
                    value={values.premium}
                    onChange={handleChange}
                    isInvalid={touched.premium && errors.premium}
                  />
                  <Form.Control.Feedback type="invalid">{errors.premium}</Form.Control.Feedback>
                  <InputGroup.Append>
                    <Button type="submit" variant="primary" size="lg" disabled={isValidating || isSubmitting}>
                      Submit
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                {showLastSaved(values) && (
                  <Form.Text className="text-muted">
                    Last saved value: <strong>€{premium}</strong>.
                  </Form.Text>
                )}
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default Insurer
