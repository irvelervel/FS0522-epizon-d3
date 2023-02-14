import Book from './Book'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const BookList = ({ books, changeBook, bookSelected }) => {
  const applicationSpinner = useSelector((state) => state.book.isLoading)

  return (
    <div className="mb-3">
      {applicationSpinner && <Spinner animation="border" variant="success" />}
      {books.map((book) => (
        <Book
          key={book.id}
          book={book}
          changeBook={changeBook}
          bookSelected={bookSelected}
        />
      ))}
    </div>
  )
}

export default BookList
