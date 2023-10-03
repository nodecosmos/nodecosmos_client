import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../features/app/appSlice';

export default function useHandle404Alert(error) {
  const dispatch = useDispatch();

  return useCallback(() => {
    if (error.message.includes('404')) {
      dispatch(setAlert({ isOpen: true, severity: 'error', message: 'Not found.' }));
    }
  }, [dispatch, error?.message]);
}
