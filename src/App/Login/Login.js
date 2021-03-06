import { Formik } from 'formik'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import { loginPlayer } from '../../state/actions'
import './Login.css'
import LoginButton from './LoginButton'

const Login = () => {
  const firestore = useFirestore()
  const dispatch = useDispatch()

  const validate = async ({ name, code }) => {
    const errors = {}
    if (!name) {
      errors.name = 'Please enter your name'
    }
    if (!code) {
      errors.code = 'Please enter a code'
    }
    return errors
  }

  const login = async ({ name: displayName, code }, { setFieldError }) => {
    const { empty, docs } = await firestore.get({
      collection: 'games',
      where: [
        ['status', '==', 'created'],
        ['code', '==', code.toLowerCase()]
      ],
      limit: 1
    })

    if (empty) {
      setFieldError('code', 'This is not a valid code')
      return
    }

    return dispatch(loginPlayer({ displayName, gameId: docs[0].id }))
  }

  return (
    <div className="login">
      <h1 className="mb-4">Actuarium</h1>
      <p>To join a game, enter your name and a game code.</p>
      <Formik initialValues={{ name: '', code: '' }} validate={validate} onSubmit={login}>
        {({ values, errors, touched, handleChange, handleSubmit, isValidating, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="name">
              <Form.Label srOnly>Your name</Form.Label>
              <Form.Control
                type="text"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && errors.name}
                size="lg"
                placeholder="Your name"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="code">
              <Form.Label srOnly>Game code</Form.Label>
              <Form.Control
                type="text"
                value={values.code}
                onChange={handleChange}
                isInvalid={touched.code && errors.code}
                size="lg"
                placeholder="Game code"
              />
              <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" block size="lg" disabled={isValidating || isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <LoginButton />
    </div>
  )
}

export default Login
