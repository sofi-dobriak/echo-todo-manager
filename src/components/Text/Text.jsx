import styles from './Text.module.css';

const Text = ({ children, className = '' }) => {
  return <h2 className={`${styles.empty} ${className}`}>{children}</h2>;
};

export default Text;
