export const FETCH_POSTS = 'FETCH_POSTS';

//fetch : firestoreから投稿たちを取得する
export const fetchPostsAction = (posts) => {
  return {
    type: 'FETCH_POSTS',
    payload: posts,
  }
}

export const DELETE_POST = "DELETE_POST";
export const deletePostAction = (posts) => {
    return {
        type: "DELETE_POST",
        payload: posts
    }
}

export const INIT_POSTS = "INIT_POSTS";
export const initPostsAction = () => {
    return {
        type: "INIT_POSTS",
        payload: null
    }
}