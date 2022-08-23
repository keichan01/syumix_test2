//アプリを起動した瞬間の状態を指定する

const initialState = {
    users: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    },
    posts:{
        list:[],
    }
};

export default initialState;