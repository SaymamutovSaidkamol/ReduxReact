import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';


type FieldType = {
  name: string;
  image: string;
  description: string;
  price: number
};


const Create: React.FC = () => {

  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [loading, setLoading] = useState(false)


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    axios.post("https://6764223a52b2a7619f5b899a.mockapi.io/Coutry", values).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Submission failed!',
        duration: 2,
      });
    }).finally(() => {
      form.resetFields(), messageApi.open({
        key,
        type: 'success',
        content: 'Submitted successfully!',
        duration: 2,
      });
    })

    setLoading(true); 

    setTimeout(() => {
      setLoading(false); 
    }, 1500);

  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
      key,
      type: 'error',
      content: 'Submission failed!',
      duration: 2,
    });
  };





  return (
    <>
      {contextHolder}
      <div className="container mx-auto border flex justify-center mt-40">
        <div className='border w-[400px] flex justify-center items-center px-3 py-3'>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            className='w-full'
          >
            <Form.Item<FieldType>
              label="name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder='name...' />
            </Form.Item>


            <Form.Item<FieldType>
              label="price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputNumber className='w-full border' placeholder='price...' />
            </Form.Item>

            <Form.Item<FieldType>
              label="image"
              name="image"
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <Input placeholder='image URL...' />
            </Form.Item>

            <Form.Item<FieldType>
              label="description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input placeholder='description...' />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" className='w-full' loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Create;