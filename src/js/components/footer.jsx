import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let {todoNum,clearCompleted,showView,view} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{todoNum}</strong> {todoNum>1?"items":"item"} left
                    </span>
                <ul className="filters">
                    <li><a href="javascript:void(0);" className={view=="all"?"selected":""} onClick={ev=>
                        showView("all")
                    }>All</a></li>
                    <li><a href="javascript:void(0);" className={view=="active"?"selected":""} onClick={ev=>
                        showView("active")
                    }>Active</a></li><li><a href="javascript:void(0);" className={view=="completed"?"selected":""} onClick={ev=>
                        showView("completed")
                    }>Completed</a></li>
                </ul>
                <button className="clear-completed" onClick={ev=>clearCompleted()}>Clear completed</button>
            </footer>
        )
    }
}
