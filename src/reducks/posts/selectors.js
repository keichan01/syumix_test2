import { createSelector } from "reselect";

const postsSelector = (state) => state.posts;

export const getPostsList = createSelector(
    [postsSelector],
    state => state.list
);

