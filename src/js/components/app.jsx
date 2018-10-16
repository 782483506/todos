import Item from './item'
import Footer from './footer'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoDatas: [],
            todoNum:0,
            flag:true,
            //状态是为了按esc不走blur操作
            view:"all"
        }
        this.addTodo = this.addTodo.bind(this);
        this.del = this.del.bind(this);
        this.changeHasCompleted = this.changeHasCompleted.bind(this);
        this.enterChangeTodo=this.enterChangeTodo.bind(this);
        this.clearCompleted=this.clearCompleted.bind(this);
        this.showView=this.showView.bind(this);
        this.checkedAll=this.checkedAll.bind(this);
    }
    //添加todo
    addTodo(e) {
        if (e.keyCode != 13) return;
        let value = e.target.value.trim();
        if (value == "") return;
        let { todoDatas,todoNum } = this.state;
        let id = new Date().getTime();
        let hasCompleted = false;
        let todo = {};
        todo.id = id;
        todo.value = value;
        todo.hasCompleted = hasCompleted;
        todoDatas.push(todo);
        todoNum++;
        this.setState({todoDatas,todoNum});
        e.target.value = "";
    }

    //删除
    del(todo) {
        let { todoDatas,todoNum } = this.state;
        todoDatas = todoDatas.filter((value) => {
            if(!value.hasCompleted && value.id==todo.id){
                todoNum--;
            }
            return !(value.id == todo.id);
        })
        //引发重新render
        this.setState({todoDatas,todoNum});
    }

    //点击切换当前事件状态
    changeHasCompleted(todo){
        let {todoDatas,todoNum} = this.state;
        todoDatas = todoDatas.map((value)=>{
            if(value.id == todo.id){
                value.hasCompleted = !value.hasCompleted;
                if(value.hasCompleted){
                    todoNum--;
                }else{
                    todoNum++;
                }
            }
            return value;
        })
        this.setState({todoDatas,todoNum});
    }

    //编辑
    enterChangeTodo(ev,todo){
        let {todoDatas,flag} = this.state;
        //Esc取消编辑
        if(ev.keyCode==27 && flag){
            flag=false;
            this.setState({
                todoDatas,
                flag
            });
            setTimeout(()=>{
                this.setState({
                flag:true
                });
            },10);
            return true;
        }

        //Enter确认编辑
        if((ev.keyCode==13 || ev.type=="blur") && flag){
            todoDatas = todoDatas.map((value)=>{
                if(value.id==todo.id){
                    value.value=ev.target.value.trim();
                }
                return value;
            })
            this.setState({todoDatas});
            return true;//子组件inEdit:false，改变状态，代表更新成功
        }
    }

    //删除已完成的todo
    clearCompleted(){
        let {todoDatas} = this.state;
        todoDatas = todoDatas.filter((value)=>{
            return !value.hasCompleted;
        });
        this.setState({
            todoDatas
        })
    }

    //过滤 all active completed
    showView(view){
        alert(view);
        this.setState({view});
    }

    //全选否
    checkedAll(ev){
        let {todoDatas,todoNum} = this.state;
        todoDatas = todoDatas.map((value)=>{
            if(ev.target.checked){
                value.hasCompleted=true;
                todoNum=0;
                return value;
            }else{
                value.hasCompleted=false;
                todoNum=todoDatas.length;
                return value;
            }
        })
        this.setState({
            todoDatas,
            todoNum
        })
    }
    render() {
        let { addTodo,del,changeHasCompleted,enterChangeTodo,clearCompleted,showView,checkedAll } = this;
        let { todoDatas,todoNum,view } = this.state;
        let filterTodos  = todoDatas.filter((value)=>{
            switch(view){
                case "all":
                return true;
                case "active":
                return !value.hasCompleted;
                case "completed":
                return value.hasCompleted;
            }
        })
        let items = filterTodos.map((todo) => {
            return <Item todo={todo} key={todo.id} del={del} changeHasCompleted={changeHasCompleted} completed={todo.hasCompleted?"completed":""} enterChangeTodo={enterChangeTodo}/>
        })
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input type="text" className="new-todo" placeholder="What needs to be done?" onKeyUp={addTodo} />
                    </header>
                    <section className="main">
                        <input type="text" id="toggle" className="toggle-all" type="checkbox" onClick={checkedAll}/>
                        <ul className="todo-list">
                            {items}
                        </ul>
                    </section>
                    {/* 将todoNum传过去 */}
                    <Footer todoNum={todoNum} clearCompleted={clearCompleted} showView={showView} view={view}/>
                </section>
            </div>
        )
    }
}
export default App;