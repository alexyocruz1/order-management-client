import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const styles = {
    navWrapper: {
      backgroundColor: '#0D47A1',
    },
    brandLogo: {
      fontSize: '2rem',
    },
  };

  if (window.innerWidth <= 767) {
    styles.brandLogo.fontSize = '1.5rem';
  }

  return (
    <nav style={styles.navWrapper}>
      <div className="container">
        <Link to="/" style={styles.brandLogo} className="brand-logo center">
          Order Management
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;