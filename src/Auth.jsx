import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSignedIn} from "./reducks/users/selectors";
import {listenAuthState} from "./reducks/users/operations";
import { push } from 'connected-react-router';

//ユーザがサインインしている状態かを監視
//サインインしていない状態であればlistenAuthStateを呼び出す

const Auth = (props) => {

    const {children} = props;
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, []);
    /*
    if (!isSignedIn) {
        alert("サインアウト扱い")
        return <></>
    }
    */
    //サインインしていれば前いた時の画面を出力
    return children;
};

export default Auth;