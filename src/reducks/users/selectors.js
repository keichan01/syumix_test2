import { createSelector } from "reselect";

//ここからuser用のselector宣言部
const usersSelector = (state) => state.users;

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

export const getUserRole = createSelector(
    [usersSelector],
    state => state.role
);

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
);