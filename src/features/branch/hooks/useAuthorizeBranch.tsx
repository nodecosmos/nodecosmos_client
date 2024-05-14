import useBranchContext from './useBranchContext';
import { selectCurrentUser } from '../../users/users.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useAuthorizeBranch(): boolean {
    const {
        isBranch, ownerId, editorIds,
    } = useBranchContext();
    const currentUser = useSelector(selectCurrentUser);

    return useMemo(() => {
        return isBranch
            && !!currentUser
            && (ownerId === currentUser.id || !!editorIds?.has(currentUser.id));
    }, [currentUser, editorIds, isBranch, ownerId]);
}
