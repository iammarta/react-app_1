import React, {Component} from 'react';
import './app.css';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';


export default class App extends Component {
    constructor(props){
    super(props);
this.state={
    data : [
        {label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",like:false, important: true, id:1 },
        {label: "Ut enim ad minim veniam.",like:false, important: false, id:2},
        {label: "Excepteur sint occaecat cupidatat non proident.",like:false, important: false, id:3 }
    ],
    term:'',
    filter:'all'
};
this.deleteItem = this.deleteItem.bind(this);
this.addItem = this.addItem.bind(this);
this.onToggleImportant = this.onToggleImportant.bind(this);
this.onToggleLike = this.onToggleLike.bind(this);
this.onUpdateSearch = this.onUpdateSearch.bind(this);
this.onFilterSelect = this.onFilterSelect.bind(this);


this.maxId=4;
    }
    deleteItem(id){
        this.setState(({data})=>{
const index = data.findIndex(elem=>elem.id===id);
const before = data.slice(0,index);
const after = data.slice(index+1);

const newArr = [...before, ...after];
return {
    data:newArr
}

        });
    }
    addItem(body){
       const newItem = {
           label:body,
           important: false,
           id: this.maxId++,
       }
       this.setState(({data})=>{
           const newArr=[...data, newItem];
           return {
               data:newArr
           }
       })
    }
    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const old = data[index];
            const newItem = {...old,important: !old.important};
            const before = data.slice(0,index);
            const after = data.slice(index+1);
            
            const newArr = [...before,newItem, ...after];
            return{
                data: newArr
            }
        });
    }
    onToggleLike(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id===id);
            const old = data[index];
            const newItem = {...old,like: !old.like};
            const before = data.slice(0,index);
            const after = data.slice(index+1);
            
            const newArr = [...before,newItem, ...after];
            return{
                data: newArr
            }
        });
    }
    searchPost(items, term){
        if(items.length===0){
            return items
        }
        return items.filter((item)=>{
            return item.label.indexOf(term)>-1
        });
    }
    filterPost(items, filter){
        if(filter==='like'){
            return items.filter((item)=>item.like)
        }else{
            return items
        }
            }
    onUpdateSearch(term){
this.setState({term})
    }
 onFilterSelect(filter){
    this.setState({filter})
 }
    render(){
        const {data,term, filter} = this.state;
        const liked = data.filter(item=>item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return (
            <div className="app">
        <AppHeader liked={liked}
        allPosts={allPosts}/>
        <div className="search-panel d-flex">
        <SearchPanel
        onUpdateSearch={this.onUpdateSearch}/>
        <PostStatusFilter
        filter={filter}
        onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList posts={visiblePosts}
        onDelete={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleLike={this.onToggleLike}/>
        <PostAddForm onAdd={this.addItem}/>
        </div>
            )
    }
}

