import useUsername from './useUsername';
import { selectUser } from '../users.selectors';
import { useSelector } from 'react-redux';

export default function useProfileUser() {
    const username = useUsername();

    return useSelector(selectUser(username));
}
