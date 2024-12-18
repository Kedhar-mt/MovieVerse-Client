import React, { useEffect, useState } from 'react';
import '../styles/MVLogoAnimation.css';

const MVLogoAnimation = ({ onAnimationEnd }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 4000); // Duration of the animation
    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  if (!isAnimating) return null;

  return (
    <div className="logo-animation-container">
      <div className="mv-logo">
        <div className="mv-letters">
          <span className="m-letter">M</span>
          <span className="v-letter">V</span>
        </div>
      </div>
    </div>
  );
};

export default MVLogoAnimation;
