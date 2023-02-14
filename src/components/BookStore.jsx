import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksActionAsync } from '../redux/actions'

const BookStore = () => {
  // const [books, setBooks] = useState([])
  const [bookSelected, setBookSelected] = useState(null)
  const dispatch = useDispatch()
  const booksFromTheReduxStore = useSelector((state) => state.book.stock)

  useEffect(() => {
    // now we should dispatch getBookActionAsync from here!!
    dispatch(getBooksActionAsync())
    // upon mounting of BookStore I'm starting the fetching process
    // in the action creator, that will eventually put the fetchedBooks
    // into the Redux Store (into state.book.stock)
  }, [])

  // fetching the books is not a BookStore responsability anymore...
  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch(
  //       'https://striveschool-api.herokuapp.com/food-books'
  //     )
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json()
  //       setBooks(fetchedBooks)
  //     } else {
  //       console.log('error')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={
            // here we should pass the state.book.stock array!
            // the books we're taking from the Redux Store
            booksFromTheReduxStore
          }
        />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
