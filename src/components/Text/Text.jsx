import styles from './Text.module.css';

const Text = ({ children }) => {
  return <h2 className={styles.empty}>{children}</h2>;
};

export default Text;
