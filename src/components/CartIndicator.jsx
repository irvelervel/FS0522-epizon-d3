import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameAction } from '../redux/actions'
// useSelector allows this component to READ from the Redux Store!

// useSelector reads a value from the Redux Store (READ MODE)
// useDispatch dispatches actions to the Redux Store (""WRITE MODE"")

// WE HAVE TO FOLLOW THE REACT HOOKS RULES:
// 1) Use them just into React Functional Components
// 2) Use them at the top level of your component, no loops, no nesting, no
// functions, no if statements

const CartIndicator = () => {
  const navigate = useNavigate()
  const cartLength = useSelector((state) => state.cart.content.length) // 0
  // useSelector RETURNS A VALUE from the Redux Store
  const userName = useSelector((state) => state.user.name)
  // userName is an empty string initially!
  const dispatch = useDispatch()

  console.log('CARTLENGTH', cartLength)

  const [inputValue, setInputValue] = useState('')
  // we need the input field to be controlled!

  const applicationSpinner = useSelector((state) => state.book.isLoading)
  const applicationError = useSelector((state) => state.book.isError)

  return (
    <div className="ml-auto mt-3 mb-4 d-flex">
      {applicationError && (
        <Alert variant="danger" className="mr-2">
          Something very bad happened with the books 😨
        </Alert>
      )}
      {applicationSpinner && (
        <Spinner className="mr-2" animation="border" variant="success" />
      )}
      {userName ? (
        <>
          <span className="mr-3">Hello, {userName}!</span>
          <Button color="primary" onClick={() => navigate('/cart')}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault() // avoids refreshing the page
            dispatch(setUsernameAction(inputValue))
            // we want the content of the input field to reach the reducer
            // and become the new state.user.name :)
          }}
        >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Log in here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={applicationError}
            />
          </Form.Group>
        </Form>
      )}
    </div>
  )
}

export default CartIndicator
