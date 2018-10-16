import React, { Component } from 'react'
import Img from './../../img/loading.gif'
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            infoStyle: { display: "none" },
            imgStyle: { display: "block" }
        }
    }
    render() {
        let { data, infoStyle, imgStyle } = this.state;
        return (
            <div>
                <ul style={infoStyle}>
                    {
                        data.map((value) => {
                            return (
                                <li>
                                    姓名:{value.name} 年龄:{value.age} 性别:{value.sex}
                                </li>
                            )
                        })
                    }
                </ul>
                <p style={imgStyle}>
                    <img src={Img} />
                </p>
            </div>
        )
    }

    componentDidMount() {
        $.ajax({
            url: "json/data.json",
            type: "GET",
            dataType: "json",
            success: (data) => {
                this.setState({
                    data: data.data,
                    infoStyle: { display: "block" },
                    imgStyle: { display: "none" }
                })

            }
        })
    }
}
