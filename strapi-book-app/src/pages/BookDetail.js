import './bookDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBookDetails, addBookToUser, addRating, updateRating } from '../api';
import Rating from '../components/Rating';

function BookDetail({ user }) {
  const [book, setBook] = useState(null);
  const [userRating, setUserRating] = useState(0); // State to hold the user's rating
  const params = useParams();

  useEffect(() => {
    // Fetch book details when the component mounts or params/user changes
    const getBookDetails = async () => {
      try {
        console.log('Fetching book details for book ID:', params.id);
        const response = await fetchBookDetails(params.id);
        console.log('Book details response:', response);
        const bookData = response.data.data;
        setBook(bookData);

        //  Find the user's rating if user is logged in and book has ratings
        if (user && bookData.attributes.ratings) {
          const ratings = bookData.attributes.ratings.data || bookData.attributes.ratings;
          const userRating = ratings.find(r => r.attributes.user.data.id === user.id);
          setUserRating(userRating ? userRating.attributes.score : 0);
        }
      } catch (error) {
        console.error('Error fetching book:', error.response ? error.response.data : error.message);
      }
    };

    getBookDetails();
  }, [params, user]);


// Function to handle adding the book to the user's reading list
  const handleAddToReadingList = async () => {
    if (user) {
      try {
        await addBookToUser(user.id, book.id);
        alert('The book has been added to your reading list.');
      } catch (error) {
        console.error('Error adding book to reading list:', error.response ? error.response.data : error.message);
        alert('Could not add the book to your reading list.');
      }
    } else {
      alert('You must be logged in to add books to your reading list.');
    }
  };


    // Function to handle rating the book
  const handleRateBook = async (rating) => {
    console.log('handleRateBook called with rating:', rating);
    console.log('User object:', user); // Log the user object

    if (user && user.id) {
      try {
        const ratings = book.attributes.ratings ? book.attributes.ratings.data || book.attributes.ratings : [];
        console.log('Ratings array:', ratings); // Log the ratings array

        const existingRating = ratings.find(r => r.attributes.user.data && r.attributes.user.data.id === user.id);
        let response;

        if (existingRating) {
          response = await updateRating(existingRating.id, rating);
        } else {
          response = await addRating(user.id, book.id, rating);
        }

        console.log('Rating response:', response);

        alert('The book has been rated.');
        setUserRating(rating); // Update the user's rating

        // Update book data after rating
        const updatedResponse = await fetchBookDetails(params.id);
        const updatedBookData = updatedResponse.data.data;
        setBook(updatedBookData);
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Error rating book:', error.response.data);
        } else {
          console.error('Error rating book:', error.message);
          console.error('Full error object:', error); // Log the full error object
        }
        alert('Could not rate the book.');
      }
    } else {
      alert('You must be logged in to rate books.');
    }
  };

  // Function to calculate the average rating of the book
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.attributes.score, 0);
    return total / ratings.length;
  };

  if (!book) return <div>Loading...</div>;

  const averageRating = calculateAverageRating(book.attributes.ratings ? book.attributes.ratings.data : []);

  return (
    <div className='bookDetail wrapper'>
      <div className='bookDetail__top'>
        {book.attributes.imageLink && (
          <img src={book.attributes.imageLink} alt='book' />
        )}
        <div className='bookDetail__topDec'>
          <h3>{book.attributes.title}</h3>
          <p>{book.attributes.subtitle}</p>
          <div className='bookDetail__authors'>
            By: {Array.isArray(book.attributes.authors) ? book.attributes.authors.map((author, i) => (
              <span key={i}>{author}</span>
            )) : <span>{book.attributes.authors}</span>}
          </div>
          <span>{book.attributes.publishDate}</span>
          {book.attributes.previewLink && (
            <a href={book.attributes.previewLink} className='sourceLink'>View in Source</a>
          )}
          {user && (
            <button onClick={handleAddToReadingList} className='addToReadingList-button'>Add to Reading List</button>
          )}
          {user && (
            <Rating initialRating={userRating} onRate={handleRateBook} /> // Pass the user's rating as initialRating
          )}
          <div className='bookDetail__averageRating'>
            <br>
            </br><h4>Average Rating:</h4>
            <p>{averageRating ? averageRating.toFixed(2) : 'No rating yet'}</p>
          </div>
        </div>
      </div>
      <div className='bookDetail__bottomDec'>
        <h4>Description</h4>
        <p>{book.attributes.description}</p>
      </div>
    </div>
  );
}

export default BookDetail;
