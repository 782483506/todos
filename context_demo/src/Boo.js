import React, { Component } from 'react'
import emitter from './ev'
export default class componentName extends Component {
    render() {
        const cb = (msg)=>{
            return ()=>{
                //出发自定义事件
                emitter.emit("callMe",msg)
            }
        }
        return (
            <div>
                我说非嵌套2号，点击按钮可以改变非嵌套1号
                <button onClick={
                    cb("123")
                }>点击我</button>
            </div>
        )
    }
}
