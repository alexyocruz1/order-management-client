import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainContentStyle = {
    flex: 1,
  };

  return (
    <div style={layoutStyle}>
      <NavBar />
      <div style={mainContentStyle}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;