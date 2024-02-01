import { useParams } from 'react-router-dom';

export default function useUsername() {
    const { username } = useParams();

    if (!username) {
        throw new Error('useUsername() must be called within a <Route path="/:username" />');
    }

    return username;
}
