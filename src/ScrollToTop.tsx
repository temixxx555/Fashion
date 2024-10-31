// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
  
      window.scrollTo(0, 0);
 
  }, [pathname]); // Trigger scroll on pathname or cartOpen change

  return null;
};

export default ScrollToTop;
