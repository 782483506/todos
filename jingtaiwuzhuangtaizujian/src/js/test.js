import React from 'react';
class Test extends React.Component{
    render(){
        let jsonTest=[
            {id:1,name:"tom",age:19,sex:"男"},
            {id:2,name:"jarry",age:20,sex:"男"},
            {id:3,name:"susan",age:21,sex:"女"},
        ]
        return (
            <div>
                <ul>
                    {
                        jsonTest.map((value)=>{
                            return <li key="{value.id}">姓名：{value.name} 年龄：{value.age} 性别：{value.sex} 
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
} 
export default Test;