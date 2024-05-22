// src/components/Rating.js
import React, { useState, useEffect } from 'react';
import './rating.css'; // Make sure this file exists for specific styling

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="rating-container">
      <p className="rating-label">Your rating of this book:</p>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {
                setRating(index);
                onRate(index);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
