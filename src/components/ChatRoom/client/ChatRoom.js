import React, {useState} from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Contacts from './Contacts'
import Conversations from './Conversations'
import { Tabs, Avatar, Image, Tooltip, Modal } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {useAuth} from '../../../context/AuthContext'
import ContactModal from './ContactModal';
import ConversationModal from './ConversationModal';
import { ChatContactProvider } from '../../../context/ChatContactContext';
export default function ChatRoom() {

  const { TabPane } = Tabs;
  const [fold, SetFold] = useState(true);
  const [isContacts, setIsContacts] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const {currentUser} = useAuth();

  function handleClickFold() {
    SetFold(!fold);
  }

  function callback(key) {
    console.log(key);
    setIsContacts(key === 'contacts');
  }

  function handleClickModal() {
    setIsModalVisible(true);
  }

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setIsModalVisible(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
  <ChatContactProvider>
    <div className="chat-room__container">
      <div className={`chat-user ${fold ? '' : 'chat-user__folder--open'}`}>
        <div className={"chat-user__avatar"}>
          <Tooltip title={`${currentUser.displayName}`} placement="leftBottom">
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
      <div className="chat-room__content">
        <Tabs onChange={callback} type="card" size="large" className="chat-room-content-tabs">
          <TabPane tab="联系人" key="contacts">
            <Contacts />      
          </TabPane>
          <TabPane tab="聊天内容" key="conversations">
            <Conversations />
          </TabPane>
        </Tabs>
        <div className="chat-room__content-btn-container">
          <button className="btn btn--hollow" onClick={handleClickModal}>{isContacts ? '创建新联系人':'创建新聊天'}</button>
        </div>
        <Modal title={isContacts ? '创建新联系人':'创建新聊天'} visible={isModalVisible}  onCancel={handleCancel} footer={null}>
          {
            isContacts ?  <ContactModal closeModal={handleCancel}/> : <ConversationModal closeModal={handleClickModal}/> 
          }
        </Modal>
      </div>
    </div>
  </ChatContactProvider>
  )
}
