import React, {useState} from 'react'
import { UserOutlined, FormOutlined, MessageOutlined, InstagramOutlined } from '@ant-design/icons';
export default function HomePage() {
  
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(!open);
  }
  return (
    <div className="home__container">
      <div className="home__user-info">
        <button className={"btn btn--hollow"} onClick={() => {handleClickOpen()}}>
         <UserOutlined />
        </button>
        <div className={`home__user-info-list ${open ? 'home__user-info-list--open' : ''}` }>
          <li className="home__user_info-item">用户信息</li>
          <li className="home__user_info-item">用户信息</li>
          <li className="home__user_info-item">用户信息</li>
        </div>
      </div>
      <div className="home__title">帅得乱七八糟</div>
      <div className="home__content">
        <button className="btn btn--hollow"><FormOutlined />计划列表</button>
        <button className="btn btn--hollow"><InstagramOutlined />图片编辑</button>
        <button className="btn btn--hollow"><MessageOutlined />聊天室</button>
      </div>
    </div>
  )
}
