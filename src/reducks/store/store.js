import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
}from "redux";
import thunk from "redux-thunk";
import { UsersReducer } from "../users/reducers";
import { PostsReducer } from "../posts/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";

//このアプリで管理するstateとそれを変更するreducerをreduxに定義する(storeの作成)
//このアプリでstoreを使うという宣言はsrc/index.jsで行う

//actionsは関数を受け取ることができない(async/awaitを使えない)ため、普通なら非同期処理不可
//そこでactionsでも非同期処理をするためにthunkを使う。
//データに関する非同期処理=>redux-thunk
//画面遷移等データ以外に関する非同期処理=>async/await
const createStore=(history)=>{
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users:UsersReducer,
            posts: PostsReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}
export default createStore