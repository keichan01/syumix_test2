import React from "react";
import { push } from "connected-react-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { getDoc, setDoc, doc, collection, query, orderBy, getDocs, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { RestaurantRounded } from "@material-ui/icons";
import { signInAction, signOutAction } from "./actions";



export const resetPassWord = (email) =>{
    return async(dispatch) =>{
        if(email === ""){
            alert("未入力の必須項目があります。");
            return false
        }else{
            return auth.sendPasswordResetEmail(email).then(() =>{
                alert("入力されたアドレスにパスワード再設定用のメールを送信しました。");
                dispatch(push("/signin"));
            }).catch(() =>{
                alert("本サービスに登録されていないメールアドレスです。")
            })
        }
    }
}

//ユーザが一度画面から離れて戻ってきた際にログイン情報が残っているかどうかを判定
//残っている=>ユーザ情報取得、残ってない=>ログインページにとばす
export const listenAuthState = () =>{
    return async(dispatch) =>{
        return onAuthStateChanged(auth, (user) =>{
            if(user){
                //残ってた場合
                const uid = user.uid;
                getDoc(doc(db, "users", uid)).then(snapshot =>{
                    const data = snapshot.data();
                    if(!data){
                        throw new Error("ユーザデータ破損")
                    }
                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: user.uid,
                        username: data.username,
                    }))
                })
            }else{
                //残ってなかった場合
                dispatch(push('/signin'))
            }
        })
    }
}

export const signIn = (email, password) =>{
    return async(dispatch)=>{
        if(email === "" || password ===""){
            alert("未入力の必須項目があります。");
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then(result =>{
            const user = result.user;
            if(user){
                const uid = user.uid;
                getDoc(doc(db, "users", uid)).then((snapshot) =>{
                    const data = snapshot.data();
                    if (!data) {
                        throw new Error('ユーザーデータが存在しません');
                    }
                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: data.uid,
                        username: data.username,
                    }));
                    dispatch(push("/"))
                })
            }else{
                throw new Error("パスワードが違います。");
            }
        }).catch(() =>{
            throw new Error("予期せぬエラーが発生しました。もう一度やり直してください");
        });
    }
};

export const signUp = (username, email, password, confirmPassword) =>{
    return async (dispatch) =>{
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('未入力の必須項目があります。');
            return;
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう一度お試しください。');
            return;
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。');
            return;
        }
        return createUserWithEmailAndPassword(auth, email, password).then(result => {
            const user = result.user;
            if (user) {
                const uid = user.uid;
                const timestamp = FirebaseTimestamp.now();
                const userInitialData = {
                  created_at: timestamp,
                  isSignedIn: true,
                  role: 'user',
                  uid: uid,
                  updated_at: timestamp,
                  username: username
                }
                //ここでsignupしたuserデータをfirestoreに保存
                setDoc(doc(db, 'users', uid), userInitialData).then(() => {
                    dispatch(push('/'));
                });
            }
        }).catch((error) => {
            alert('アカウント登録に失敗しました。もう1度お試しください。')
            throw new Error(error)
        })
    }
}
export const signOut = () =>{
    return async(dispatch) =>{
        auth.signOut().then(() =>{
            alert("サインアウトされました。");
            dispatch(signOutAction());
            dispatch(push('/signin'));
        })
    }
}