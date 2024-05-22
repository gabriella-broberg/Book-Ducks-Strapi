import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

const getAuthToken = () => {
  return localStorage.getItem('jwt');
};

export const fetchThemeSettings = async () => {
  return await axios.get(`${API_URL}/theme-setting`);
};

export const fetchBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

export const fetchBookDetails = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    params: {
      populate: 'ratings.user',
    },
  });
};

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      params: {
        populate: 'books,ratings.book',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addBookToUser = async (userId, bookId) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/users/${userId}`, {
      books: {
        connect: [bookId]
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book to user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const removeBookFromUser = async (userId, bookId) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/users/${userId}`, {
      books: {
        disconnect: [bookId]
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing book from user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addRating = async (userId, bookId, score) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/ratings`, {
      data: {
        score: score, // Use score as the field name
        user: userId, // Specify user
        book: bookId, // Specify book
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding rating:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateRating = async (ratingId, score) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/ratings/${ratingId}`, {
      data: { score: score } // Use score as the field name
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating rating:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//  function to handle login
export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/auth/local`, {
    identifier: email,
    password,
  });
};
