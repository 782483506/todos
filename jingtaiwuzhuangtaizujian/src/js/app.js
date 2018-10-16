import React from 'react';
class App extends React.Component{
    render(){
        let names = ["tom","jarry","susan"];
        return (
                <div>
                    <ul>
                        {
                            names.map((value,index)=>{
                                return <li key={index}>{value}</li>
                            })
                        }
                    </ul>

                </div>
        )
    }
}
export default App;

/*
继续练习呀

class app extends React.Component {
    render(){
        let names = ['数组'];
        return (
            <div>
                <ul>
                    names.map((value,index)=>{
                        return <li key="index">{value}</li>
                    })
                </ul>
            </div>
        )
    }
}


*/