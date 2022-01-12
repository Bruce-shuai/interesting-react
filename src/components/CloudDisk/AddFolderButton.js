import React, { useState } from 'react'
import { FolderAddOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button } from 'antd';
import { database } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function AddFolderButton({currentFolder}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { currentUser } = useAuth();

  const openModal = () => {
    setOpen(!open)
  }
  const onFinish = (values) => {
    const {name} = values
    if (currentFolder == null) {
      setOpen(false);
      return;
    };

    console.log('currentFolder', currentFolder)
    // const path = [...currentFolder.path]
    // if (currentFolder !== ROOT_FOLDER) {
    //   path.push({ name: currentFolder.name, id: currentFolder.id})
    // }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      // path: path,
      createAt: database.getCurrentTimestamp()
    })
    setName('');
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <button className="btn btn--file-add" onClick={openModal}>
        <FolderAddOutlined/>
      </button>
      <Modal visible={open} footer={null} onCancel={() => {setOpen(false)}}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="文件夹名称" name="name">
            <Input placeholder="请输入文件夹名称" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 19, span: 8 }}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
