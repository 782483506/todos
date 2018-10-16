import React, { Component } from 'react'
import { toUnicode } from 'punycode';

export default class Item extends Component {
    constructor() {
        super();
        this.state = {
            inEdit: false
        }
        this.onEdit = this.onEdit.bind(this)
    }

    //双击之后执行
    onEdit(todo) {
        this.refs.myInput.value = todo.value;
        this.setState({
            inEdit: true
        }, () => {
            //这是setState的回调函数
            this.refs.myInput.focus();
        })
    }

    render() {
        let { todo, del, changeHasCompleted, completed, enterChangeTodo } = this.props;
        let { onEdit } = this;
        let { inEdit } = this.state;
        //let style=changeHasCompleted.hasCompleted;
        let style = completed ? completed : "";
        style = inEdit ? style + " editing" : style;
        return (
            <li className={style}>
                <div className="view">
                    <input type="checkbox" className="toggle" onClick={ev => { changeHasCompleted(todo) }} checked={todo.hasCompleted ? true : false} readOnly/>
                    <label onDoubleClick={ev => onEdit(todo)}>{todo.value}</label>
                    <button className="destroy" onClick={() => { del(todo) }}></button>
                </div>
                <input type="text" className="edit" ref="myInput" onKeyDown={ev => {
                    if (enterChangeTodo(ev, todo)) {
                        this.setState({ inEdit: false })
                    }
                }} onBlur={ev => {
                    if (enterChangeTodo(ev, todo)) {
                        this.setState({
                            inEdit: false
                        })
                    }
                }} />
            </li>
        )
    }
}