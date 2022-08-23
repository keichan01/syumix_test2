import React, {useEffect} from 'react';
import {PostCard} from "../components/Posts";
import {useDispatch, useSelector} from "react-redux";
import {getPostsList} from '../reducks/posts/selectors';
import {fetchPosts} from "../reducks/posts/operations";
import { push } from 'connected-react-router';


const PostList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const posts = getPostsList(selector);

    useEffect(() => {
        dispatch(fetchPosts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {posts.length > 0 && 
                    posts.map(post => (
                        <PostCard
                            key={post.id} id={post.id} images={post.images}
                            price = {post.price} name={post.name}
                        />
                    )
                )}
                {
                    posts.length === 0 && 
                    <div>Now Loading....</div>

                }
            </div>
        </section>
    );
};

export default PostList;