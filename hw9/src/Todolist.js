import React from "react";
import "./Todolist.css"
class Todolist extends React.Component { 
    constructor(props) { 
      super(props); 
      this.state = { 
        value: '', 
        itemList: [],
        itemDone: [], 
      }; 
      this.handleChange = this.handleChange.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this); 
    } 
    handleChange(event) { 
      this.setState({value: event.target.value}); 
    } 
    handleSubmit(event) { 
      this.state.itemList.push(this.state.value);
      this.state.itemDone.push(false); 
      this.setState({value: '', itemList: this.state.itemList,itemDone:this.state.itemDone}); 
      event.preventDefault(); 
    }
    handleDelete(index){
        const temp=this.state.itemList.filter((item,i)=>{
            return index!==i
        })
        const temp2=this.state.itemDone.filter((item,i)=>{
            return index!==i
        })
        this.setState({value:'',itemList:temp,itemDone:temp2});
    }
    handleDone(index){
        const temp=this.state.itemDone;
        if(temp[index]===true){
            temp[index]=false;
        }else{
            temp[index]=true;
        }
        this.setState({itemDone:temp});
    }
    render() { 
      return ( 
        <div className="todolist_wrapper"> 
        <form onSubmit={this.handleSubmit} className="todolist_addform"> 
          <label className="todolist_title">Todo-List</label><br></br>
            <input type="text" value={this.state.value} onChange={this.handleChange} className="todolist_input"placeholder="add a new todo..."/> 
          <input type="submit" value="Add" className="todolist_addbtn"/> 
        </form> 
        <div className="todolist_list-wrapper"> 
            {this.state.itemList.map((item, index) => 
            <div key={`item_${index}`}>
                <input type="checkbox" id={index} onClick={()=>this.handleDone(index)} className="todolist_checkbox"></input>
                {this.state.itemDone[index] ? <label for={index} style={{textDecoration:'line-through'}} className="todolist_itemlist">{item}</label>: <label for={index} className="todolist_itemlist">{item}</label>}
                <button onClick={()=>this.handleDelete(index)} className="todolist_rmbtn">X</button>
            </div>
          ) } 
        </div> 
        </div> 
      ); 
    } 
  } 

export default Todolist;