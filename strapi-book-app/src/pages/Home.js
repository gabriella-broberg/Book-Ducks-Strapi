// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api';
import Book from '../components/Book';
import './home.css';

function Home({ user }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetchBooks();
        const fetchedData = response.data.data;
        setBooks(fetchedData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="main-container">
      <div className='home'>
        <div className='hero wrapper'>
          <div className='wrapper'>
            <div className='hero__text'>
              <h2>Duck books library</h2>
              <p>Find all the quacking good duck books you need in one place!</p>
            </div>
            <img src='/duck-reading.png' alt='duck reading a book' />
          </div>
        </div>  

        <div className='allBooks wrapper'>
          <div className='books'>
            {books.map((book) => (
              <Book
                key={book.id}
                title={book.attributes.title}
                image={book.attributes.imageLink}
                authors={[book.attributes.authors]}
                publisher={book.attributes.publisher}
                publishDate={book.attributes.publishDate}
                id={book.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
