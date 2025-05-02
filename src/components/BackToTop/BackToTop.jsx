import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './BackToTop.module.css';
import { FaAngleUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={scrollTop}
      className={`${styles.backToTopButton} ${isVisible ? styles.visible : ''}`}
    >
      <FaAngleUp className={styles.backToTopIcon} />
    </Button>
  );
};

export default BackToTop;
