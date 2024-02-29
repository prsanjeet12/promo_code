import React, { useState } from 'react';
import { Table, Alert, Button, Modal, Popover, Form, Input, DatePicker, InputNumber } from 'antd';
import { EyeOutlined } from '@ant-design/icons'; // Import the eye icon
import './style.css';

const promoCodesData = [
  {
    id: '1',
    codeValue: '10OFF',
    discountAmount: '₹50 off',
    expiryDate: '2024-12-31',
    usageLimit: 100,
    usageCount: 50,
    creationDate: '2024-02-29',
    lastUpdatedDate: '2024-02-29',
    createdByAdminID: '123',
    createdByAdminName: 'Admin1',
    companyCode: 'ABC123'
  },
  {
    id: '2',
    codeValue: '20OFF',
    discountAmount: '₹100 off',
    expiryDate: '2024-12-31',
    usageLimit: 50,
    usageCount: 30,
    creationDate: '2024-02-28',
    lastUpdatedDate: '2024-02-28',
    createdByAdminID: '456',
    createdByAdminName: 'Admin2',
    companyCode: 'XYZ456'
  },
  {
    id: '3',
    codeValue: 'FREEDEL',
    discountAmount: 'Free Ride',
    expiryDate: '2024-12-31',
    usageLimit: 200,
    usageCount: 150,
    creationDate: '2024-02-27',
    lastUpdatedDate: '2024-02-27',
    createdByAdminID: '789',
    createdByAdminName: 'Admin3',
    companyCode: 'DEF789'
  }
];

const PromoCodesTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = () => {
    form.validateFields().then(values => {
      console.log('Created promo code:', values);
      setIsCreateModalVisible(false);
    }).catch(error => {
      console.error('Validation error:', error);
    });
  };

  const handleUpdate = () => {
    form.validateFields().then(values => {
      console.log('Updated values:', values);
      setIsModalVisible(false);
    }).catch(error => {
      console.error('Validation error:', error);
    });
  };
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };
  const columns = [
    {
      title: 'Promo Code ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Code Value',
      dataIndex: 'codeValue',
      key: 'codeValue',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Usage Limit',
      dataIndex: 'usageLimit',
      key: 'usageLimit',
    },
    {
      title: 'Usage Count',
      dataIndex: 'usageCount',
      key: 'usageCount',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: 'Last Updated Date',
      dataIndex: 'lastUpdatedDate',
      key: 'lastUpdatedDate',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          <EyeOutlined className='text-black' />
        </Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Popover
          content={
            <div className='flex gap-4 text-white' >
              <Button className='bg-blue-700 text-white' onClick={() => showModal(record)}>Edit</Button>
              <Button className='bg-red-700 text-white'   >Delete</Button>
            </div>
          }
          trigger="click"
        >
          <Button type="link">More</Button>
        </Popover> 
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <Alert
        message={
          <div>
            <span className="block sm:inline">Here you can manage promo codes for the CHOLA app. Make sure to review and update the promo codes regularly.</span>
          </div>
        }
        type="info"
        showIcon
        closable
        style={{ marginBottom: '16px' }}
      />
      <h1 className="text-3xl font-bold my-4">Promo Codes</h1>
   
      <div className=" font-poppins mt-2 text-black overflow-hidden font-semibold">
      <button
  className="bg-[rgb(142,109,233)] px-4 py-3 text-center text-white
   font-bold rounded  mr-20 mb-4 focus:outline-none focus:shadow-outline"
  style={{ float: 'right' }}
  onClick={showCreateModal}
>
  Create Promo Code
</button>
        <Table
          columns={columns}
          dataSource={promoCodesData}
          rowClassName={`text-[15px] highlight-border `}
          bordered
          size='small'
          pagination={false}
          className="shadow-2xl ml-2 mr-3 font-poppins mt-5 bg-white text-black custom-table overflow-hidden font-semibold"
        />
      </div>
      <Modal
  title="Edit Promo Code"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null}
>
  <div className="bg-white rounded p-8">
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Code Value</label>
        <Input className="bg-gray-100 border-[2px] py-3"  />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Discount Amount</label>
        <Input className="bg-gray-100 border-[2px] py-3"  />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
        <Input className="bg-gray-100 border-[2px] py-3"  />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Usage Limit</label>
        <Input className="bg-gray-100 border-[2px] py-3"  />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[rgb(142,109,233)] px-6 py-2
          justify-center lg:mr-40
          text-white font-bold rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </form>
  </div>
</Modal>
<Modal
        title="Create Promo Code"
        visible={isCreateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="bg-white rounded p-8">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Code Value</label>
              <Input className="bg-gray-100 border-[2px] py-3" name="codeValue" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Discount Amount</label>
              <Input className="bg-gray-100 border-[2px] py-3" name="discountAmount" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
              <DatePicker className="bg-gray-100 border-[2px] py-3" name="expiryDate" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Usage Limit</label>
              <InputNumber className="bg-gray-100 border-[2px] py-3" name="usageLimit" />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-[rgb(142,109,233)] px-6 py-2 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PromoCodesTable;
