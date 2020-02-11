import React from 'react'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { loginAdmin } from '../../actions'

const LoginButton = () => {
  const dispatch = useDispatch()

  const login = () => dispatch(loginAdmin())

  return (
    <Button onClick={login} variant="link" block>
      I'm a teacher
    </Button>
  )
}

export default LoginButton
