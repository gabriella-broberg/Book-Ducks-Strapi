import React from 'react';
import './footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className='footer-wrapper'>
        <div className='footer-logo' onClick={() => navigate('/')}>
          <h2>BookDucks</h2>
        </div>
        <div className='footer-info'>
          <p>
            Ett skolprojekt skapat av{' '}
            <a href="https://gabriellabroberg.se" target="_blank" rel="noopener noreferrer">
              gabriellabroberg.se
            </a>
          </p>
          <p>
            Byggd i React med Strapi backend, för kursen "Interaktion med CMS" under utbildningen "Frontendutveckling" på Nackademin.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
