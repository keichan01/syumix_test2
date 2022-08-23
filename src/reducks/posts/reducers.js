import * as Actions from './actions';
import initialState from '../store/initialState';

export const PostsReducer = (state = initialState.posts, action)  => {
    switch (action.type) {
        case Actions.DELETE_POST:
            return {
                ...state,
                list: action.payload
            };
        case Actions.FETCH_POSTS:
            return {
                ...state,
                list: action.payload
            };
        case Actions.INIT_POSTS:
            return {
                ...initialState.posts
            };
        default:
            return state;
    }
};