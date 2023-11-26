import { LikeState } from './types';

interface State { likes: LikeState; }

export const selectLikedObjectIds = (state: State) => state.likes.likedObjectIds;
