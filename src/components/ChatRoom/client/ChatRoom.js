import React, {useState} from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Contacts from './Contacts'
import Conversations from './Conversations'
import { Tabs, Avatar, Image, Tooltip } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
export default function ChatRoom() {

  const { TabPane } = Tabs;
  const [fold, SetFold] = useState();

  function handleClickFold() {
    console.log('11')
    SetFold(!fold);
  }
  function callback(key) {
    console.log(key);
  }
  return (
  <div className="chat-room__container">
    <div className={`chat-user ${fold ? '' : 'chat-user__folder--open'}`}>
      <div className={"chat-user__avatar"}>
        <Tooltip title="帅得乱七八糟" placement="leftBottom">
        <Avatar src="https://joeschmoe.io/api/v1/random" shape="square"/>
        </Tooltip>
      </div>
      <div className="chat-user__folder" onClick={handleClickFold}>
        {fold ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
      </div>
    </div>
    <div className="cancel chat-room__container-cancel">
      <button className="btn btn--remove"><Link to="/">&times;</Link></button>
    </div>
    <Tabs onChange={callback} type="card" size="large">
      <TabPane tab="联系人" key="conversations">
        <Contacts />      
      </TabPane>
      <TabPane tab="聊天内容" key="contacts">
        <Conversations />
      </TabPane>
    </Tabs>
  </div>
  )
}
