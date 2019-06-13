import React,{Component, useState} from 'react';
import {createStore} from 'redux';
import { Tag, Modal, Button, Row, Col, Icon, Input, Table} from 'antd';
import 'antd/dist/antd.css';
import Addnew from './Addnew';


const Search = Input.Search;

var divStyle = {
  padding: "20px"
};

var tableSide = {
  margin: "15px"
}

const columns = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    width: 150,
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (role:any[]) => (
      <span>
        {role.map(r => {
          let color;
          switch(r){
            case 'staff' :
              color = "red";
              break;
            case 'manager' :
              color = "green";
              break;
            default:
            color = "white";
          }
          return (
            <Tag color={color} key={r}>
              {r.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];
const reducer = (state:any[]=[],action:any)=>{
  switch(action.type){
    case "ADD" :
        state.push(action.value);
        break;
    default:
}
  return state
}

export let dataT = createStore(reducer);

class App extends React.Component{

  
  state = {
    data: Array<{firstName: string, patlastNameh: string, role:any}>(),
    dataE: Array<{firstName: string, patlastNameh: string, role:any}>()
  };
  handleSearch = (searchText:any)=> {
    let text = searchText.target.value;
    console.log(searchText.target.value);
    const filteredEvents = this.state.data.filter(({ firstName }) => {
      firstName = firstName.toLowerCase();
      return firstName.includes(text);
    });

    this.setState({
      dataE: filteredEvents
    });
  };
  render(){
  
    
  dataT.subscribe(() => {
    this.setState({data:dataT.getState()});
    this.setState({dataE:dataT.getState()});
  })
  return (
    <div className="App">
      <Row>
          <Col span={6} style={divStyle}>
            <Addnew/>
          </Col>
          <Col span={18} style={divStyle}>
              <Search placeholder="id" size="large" onChange={this.handleSearch}  allowClear>
              </Search>
          </Col>
      </Row >
      <Row style={tableSide}>
        <Table columns={columns} dataSource={this.state.dataE} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />,    
      </Row>
    </div>
  );
  }
}

export default App;
