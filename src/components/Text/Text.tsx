import styles from './Text.module.css';
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className: string;
}

const Text = ({ children, className = '' }: TextProps) => {
  return <h2 className={`${styles.empty} ${className}`}>{children}</h2>;
};

export default Text;
