import React, {useState} from 'react'
import {Form, Checkbox, Row, Col, Button} from 'antd';
import { useChatConversations } from '../../../context/ChatConversationsContext'; 
import { useChatContacts } from '../../../context/ChatContactContexts';

export default function ConversationModal({closeModal}) {
  const {conversations, createConversation} = useChatConversations();
  const { contacts } = useChatContacts();
  const [selectedContactsIds, setSelectContactsIds] = useState([]);


  const onFinish = (values) => {
    // 进行深拷贝
    const ids = JSON.parse(JSON.stringify(values.checkboxGroup))
    createConversation(ids);
    // console.log('conversations////', conversations);
    closeModal();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item 
      name="checkboxGroup" 
      >
        <Checkbox.Group>
          <Row>
            {
              contacts.map(contact => (
                <Col span={24} key={contact.id}>
                  {/* value放入contact.id是最好的，具有唯一性。放用户名不具备唯一性 */}
                <Checkbox value={`${contact.id}`} style={{ lineHeight: '32px' }}>
                  {contact.username}
                </Checkbox>
              </Col>
              ))
            }
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="create">
          创建
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
