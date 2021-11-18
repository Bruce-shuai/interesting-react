import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Contacts from './Contacts'
import Conversations from './Conversations'
import { Tabs, Avatar, Tooltip, Modal } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {useAuth} from '../../../context/AuthContext'
import ContactModal from './ContactModal';
import ConversationModal from './ConversationModal';

export default function ChatRoom() {

  const { TabPane } = Tabs;
  const {currentUser} = useAuth();
  const [fold, SetFold] = useState(true);
  const [isContacts, setIsContacts] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * 聊天室 最左边的折叠栏
   */
  function handleClickFold() {
    console.log('currentUser', currentUser);
    SetFold(!fold);
  }

  /**
   * 判断当前是聊天内容状态还是联系人状态
   * @param {*} key contacts(联系人) / conversation(聊天内容)
   */
  function callback(key) {
    setIsContacts(key === 'contacts');
  }

  /**
   * 对话框点击打开
   */
  function handleClickModal() {
    setIsModalVisible(true);
  }

  /**
   * 对话框点击关闭
   */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
  <div className="chat-room__container">
    
    {/* 聊天室用户个人信息侧边栏(最左边) */}
    <div className={`chat-user ${fold ? '' : 'chat-user__folder--open'}`}>
      <div className={"chat-user__avatar"}>
        <Tooltip title={`${currentUser?.displayName}`} placement="leftBottom">
          <Avatar src="https://joeschmoe.io/api/v1/jude" shape="square"/>
        </Tooltip>
      </div>
      <div className="chat-user__folder" onClick={handleClickFold}>
        {fold ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
      </div>
    </div>

    {/* 聊天室顶部关闭按钮 */}
    <div className="cancel chat-room__container-cancel">
      <button className="btn btn--remove"><Link to="/">&times;</Link></button>
    </div>

    {/* 聊天室主体内容部分 */}
    <div className="chat-room__content">

      {/* 联系人/聊天用户选择栏 */}
      <Tabs onChange={callback} type="card" size="large" className="chat-room-content-tabs">
        <TabPane tab="联系人" key="contacts">
          <Contacts />      
        </TabPane>
        <TabPane tab="聊天内容" key="conversations">
          <Conversations />
        </TabPane>
      </Tabs>

      {/* 创建新联系人/新聊天对话框 */}
      <div className="chat-room__content-btn-container">
        <button className="btn btn--hollow" onClick={handleClickModal}>{isContacts ? '创建新联系人':'创建新聊天'}</button>
      </div>
      <Modal title={isContacts ? '创建新联系人':'创建新聊天'} visible={isModalVisible}  onCancel={handleCancel} footer={null}>
        {
          isContacts ?  <ContactModal closeModal={handleCancel}/> : <ConversationModal closeModal={handleCancel}/> 
        }
      </Modal>
    </div>
  </div>
  )
}
