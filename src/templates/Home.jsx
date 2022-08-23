import React from "react";
import { useSelector } from "react-redux";
import { getUserId, getUsername } from "../reducks/users/selectors";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Home = () =>{
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const v = getUserId(selector);
    const k = 5884;
    const name = getUsername(selector);
    return(
        <div>
            <h2>uid, k, {k}, {name}</h2>
            <p>you are in home.v, {v}, you</p>
            <p className="u-text-small" onClick={() => dispatch(push('/post/edit'))}>アカウント登録がまだの方はこちら</p>
        </div>
    )
}

export default Home;