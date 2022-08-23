import { Route, Switch } from "react-router";
import React from "react";
import {SignUp, SignIn, ResetPW, PostEdit, PostList, PostDetail} from "./templates";
import Auth from './Auth';

//アプリの現在のurlに応じて表示する画面を変える
const Router = () =>{
    return(
        <Switch>
            <Route exact path="(/)?" component={PostList} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path='/signin/reset' component={ResetPW} />
            <Route path= {'/post/edit(/:id)?'} component={PostEdit}/>
            <Route exact path='/post/:id' component={PostDetail} />
        </Switch>
    );
};

export default Router;