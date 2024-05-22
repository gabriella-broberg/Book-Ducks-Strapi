import './header.css'
import {useNavigate} from 'react-router-dom'

function Header({ searchValue, setSearchValue, user, onLogout }) {
  const navigate = useNavigate();

  return (
    <header>
    <div className='wrapper'>
      <div className='logo' onClick={() => navigate('/')}>
        <h2><img src='/duck-reading.png' alt='logo'/> BookDucks</h2>
      </div>
      <div className='button-group'>
        {user ? (
          <>
            <button className="profile-button" onClick={() => navigate('/profile')}>{user.username}</button>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </div>
  </header> 
  )
}

export default Header
