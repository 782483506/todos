import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sub from "./Sub";
import "./App.css";
//事件订阅start
import Foo from './Foo'
import Boo from './Boo' 
//事件订阅end

export default class App extends Component{
    // 父组件声明自己支持 context
    static childContextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext(){
        return{
            color:"red",
            callback:this.getMsg.bind(this)
        }
    }

    getMsg(msg){
        console.log(msg)
    }

    render(){
        return(
            <div>
                <p>这是context</p>
                <Sub></Sub>
                <hr/>
                <p>这是事件订阅</p>
                <Foo/>
                <Boo/>
            </div>
        );
    }
}

