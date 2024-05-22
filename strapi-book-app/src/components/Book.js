import './book.css';
import { useNavigate } from 'react-router-dom';

function Book({ title, image, authors = [], publishDate, id, onClick = () => {} }) {
  const navigate = useNavigate();

  return (
    <div className='book' onClick={() => { navigate(`/detail/${id}`); onClick(); }}>
      <img src={image} alt='book' />
      <div className='book_desc'>
        <h4>{title}</h4>
        <div className='book_authors'>
          By: {Array.isArray(authors) ? authors.map((author, i) => (
            <span key={i}>{author}</span>
          )) : <span>{authors}</span>}
        </div>
        <span>{publishDate}</span>
        
      </div>
    </div>
  );
}

export default Book;