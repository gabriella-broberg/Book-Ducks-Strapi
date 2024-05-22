// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { fetchUser, removeBookFromUser } from '../api';
import './profile.css';
import Loading from '../components/Loading';

function Profile({ user }) {
  const [userData, setUserData] = useState(null);
  const [sortOrder, setSortOrder] = useState('title');
  const [ratingSortOrder, setRatingSortOrder] = useState('rating');

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        try {
          const response = await fetchUser(user.id);
          console.log('Fetched user data:', response); // Logga hämtade data
          setUserData(response);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, [user]);

  const handleRemoveFromReadingList = async (bookId) => {
    try {
      await removeBookFromUser(user.id, bookId);
      setUserData((prevUserData) => ({
        ...prevUserData,
        books: prevUserData.books.filter(book => book.id !== bookId),
      }));
      alert('The book has been deleted from your reading list');
    } catch (error) {
      console.error('Error removing book from reading list:', error);
      alert('Unable to remove book from reading list.');
    }
  };

  const sortedReadingList = userData?.books?.sort((a, b) => {
    if (sortOrder === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'author') {
      return a.authors.localeCompare(b.authors);
    }
    return 0;
  }) || [];

  const sortedRatedBooks = userData?.ratings?.sort((a, b) => {
    if (ratingSortOrder === 'title') {
      return a.book.title.localeCompare(b.book.title);
    } else if (ratingSortOrder === 'author') {
      return a.book.authors.localeCompare(b.book.authors);
    } else if (ratingSortOrder === 'rating') {
      return b.value - a.value;
    }
    return 0;
  }) || [];

  if (!userData) return <Loading />; // Använd Loading-komponenten

  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <h2>My Profile</h2>
        <div className="profile-info">
          <h4>User: {user.username}</h4>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="reading-list-container">
        <h3>Reading List</h3>
        <div className="sort-options">
          <label>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </label>
        </div>
        <ul>
          {sortedReadingList.map(book => (
            <li key={book.id} className="reading-list-item">
              <p><strong>{book.title}</strong> av {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</p>
              <button onClick={() => handleRemoveFromReadingList(book.id)} className="remove-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rated-books-container">
        <h3>Rated Books</h3>
        <div className="sort-options">
          <label>
            
            <select value={ratingSortOrder} onChange={(e) => setRatingSortOrder(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
        <ul>
          {sortedRatedBooks.map(rating => (
            <li key={rating.id} className="rated-list-item">
              <p><strong>{rating.book.title}</strong> av {Array.isArray(rating.book.authors) ? rating.book.authors.join(', ') : rating.book.authors}</p>
              <p>Your rating: {rating.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
