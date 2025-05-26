import React, { useState } from 'react';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import styles from './MobileFilterBar.module.css';
import { openModal } from '../../redux/modalSlice/slice';

const MobileFilterBar = () => {
  const dispatch = useDispatch();

  const handleOpenFilterWindow = (): void => {
    dispatch(openModal({ modalKey: 'isFilterMobileOpen' }));
  };

  return (
    <div className={styles.filterContainer}>
      <Button onClick={handleOpenFilterWindow} className={styles.filterWindowButton}>
        Фільтри
      </Button>
    </div>
  );
};

export default MobileFilterBar;
