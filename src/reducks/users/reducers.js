import initialState from "../store/initialState";
import * as Actions from "./actions";


//actionからpayloadを受け取り、storeのstateを変更(スプレット構文により上書き)する。
//ここでいうstoreはsrc/components/reducks/store内でcreateStoreにより制作したもの(reduxの機能)。
export const UsersReducer = (state = initialState.users, action) =>{
    switch(action.type){
        case Actions.SIGN_IN:
            return{
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return{
                ...initialState.users,
            };
            
        default:
            return state
    }
}