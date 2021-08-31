import React, { Component } from 'react';
import { addBook } from '../redux/books/books';
import store from '../redux/configureStore';
import Book from './common/book';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { id: 1, title: 'book1' },
        { id: 2, title: 'book2' },
        { id: 3, title: 'book3' },
      ],
      inputBook: '',
    };
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ inputBook: currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputBook, books } = this.state;
    books.push({ id: books.length + 1, title: inputBook });
    this.setState({ books });
    store.dispatch(addBook({ title: inputBook }));
  };

  handleDelete = (id) => {
    const { books } = this.state;
    const booksDel = books.filter((book) => book.id !== id);
    this.setState({ books: booksDel });
  };

  render() {
    const { books, inputBook } = this.state;
    return (
      <section>
        <ul>
          {books.map((book) => (
            <Book key={book.id} onDelete={this.handleDelete} books={book} />
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={inputBook} type="text" />
          <button type="submit">Add book</button>
        </form>
      </section>
    );
  }
}

export default Books;
