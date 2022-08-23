import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";
import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import * as History from 'history';

//store制作の宣言
const history = History.createBrowserHistory();
export const store = createStore(history);

//<Provider>で囲まれたタグ内でpropsとしてstateが渡される => そこではstateが利用できるようになる
//<connecterrouer>で囲まれた内ではブラウザのurlの遷移履歴を扱えるようになる
ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
);