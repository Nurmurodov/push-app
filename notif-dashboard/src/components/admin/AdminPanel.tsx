import React, {useEffect, useState} from "react"
import {Button, Form, Input, Modal, Table} from "antd";
import Request from "../../request/Request";
import { IoMdNotificationsOutline } from "react-icons/io";

const {Column} = Table;

const AdminPanel = () => {
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    Request.get('/users')
      .then((res: any) => {
        console.log(res.data)
        setTableData(res.data.data.users)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, []);

  const handleCancel = () => {
    setOpenModal(false)
    setId('')
  }

  const onFinish: (val: {text: string}) => void = (val) => {
    Request.get(`/notification/${val.text}/${id}`)
      .then((res: any) => {
        console.log(res.data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Table
        dataSource={tableData}
        pagination={false}
      >
        <Column title="Nomi" dataIndex={'name'} key="FIO"  />
        <Column title="Login" dataIndex={'login'} key="phone"/>
        <Column title={'notification yuborish'} width={'15%'} key={'notif'} render={(record) => (
          <span>
            <IoMdNotificationsOutline
              onClick={() => {
                setId(record._id)
                setOpenModal(true)
              }}
              style={{
                fontSize: '2rem',
                cursor: 'pointer'
              }}/>
          </span>
        )} />
      </Table>
      <Modal
        footer={false}
        title="Xabar yuborish"
        visible={openModal}
        onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Xabar matni"
            name="text"
            rules={[{ required: true, message: 'Please input text!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Yuborish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminPanel
