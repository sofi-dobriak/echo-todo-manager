import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import styles from './BurgerMenu.module.css';
import { IoMenu } from 'react-icons/io5';
import { openModal } from '../../redux/modalSlice/slice';

const BurgerMenu = () => {
  const dispatch = useDispatch();

  const handleOpen = (): void => {
    dispatch(openModal({ modalKey: 'isMobileWindowOpen' }));
  };
  return (
    <Button onClick={handleOpen} className={styles.burgerButton}>
      <IoMenu className={styles.burgerIcon} />
    </Button>
  );
};

export default BurgerMenu;
