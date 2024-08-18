import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';

const Admin = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };
  
  const initialOrderDetails = {
    orderOwner: '',
    orderName: '',
    orderDescription: '',
    orderStatus: [{ status: '', description: '', date: formatDate(new Date()) }],
    estimatedDateOfDelivery: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1))),
  };

  const [orderDetails, setOrderDetails] = useState(initialOrderDetails);
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/orders`);
      setOrders(response.data);
    } catch (error) {
      M.toast({ html: 'Error fetching orders', classes: 'red' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: name === 'estimatedDateOfDelivery' ? formatDate(value) : value });
  };

  const handleStatusChange = (index, e) => {
    const { name, value } = e.target;
    const newOrderStatus = [...orderDetails.orderStatus];
    newOrderStatus[index][name] = name === 'date' ? formatDate(value) : value;
    setOrderDetails({ ...orderDetails, orderStatus: newOrderStatus });
  };

  const addStatus = () => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      orderStatus: [...prevDetails.orderStatus, { status: '', description: '', date: new Date().toISOString().split('T')[0] }],
    }));
  };

  const removeStatus = (index) => {
    const newOrderStatus = orderDetails.orderStatus.filter((_, i) => i !== index);
    setOrderDetails({ ...orderDetails, orderStatus: newOrderStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedOrderDetails = {
        ...orderDetails,
        orderStatus: orderDetails.orderStatus.map(status => ({
          ...status,
          date: formatDate(status.date),
        })),
        estimatedDateOfDelivery: formatDate(orderDetails.estimatedDateOfDelivery),
      };
  
      if (editingOrderId) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/update-order/${editingOrderId}`, formattedOrderDetails);
        if (response.status === 200) {
          M.toast({ html: 'Order updated successfully!', classes: 'green' });
          setEditingOrderId(null);
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/create-order`, formattedOrderDetails);
        if (response.status === 201) {
          M.toast({ html: 'Order created successfully!', classes: 'green' });
        }
      }
      setOrderDetails(initialOrderDetails);
      fetchOrders();
    } catch (error) {
      M.toast({ html: 'Error creating/updating order', classes: 'red' });
    }
  };

  const handleEdit = (order) => {
    const formattedOrder = {
      ...order,
      orderStatus: order.orderStatus.map(status => ({
        ...status,
        date: formatDate(status.date),
      })),
      estimatedDateOfDelivery: formatDate(order.estimatedDateOfDelivery),
    };
    setOrderDetails(formattedOrder);
    setEditingOrderId(order._id);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/delete-order/${orderId}`);
      if (response.status === 200) {
        M.toast({ html: 'Order deleted successfully!', classes: 'green' });
        fetchOrders();
      }
    } catch (error) {
      M.toast({ html: 'Error deleting order', classes: 'red' });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h1 className="center-align">Admin Panel</h1>
          <h2 className="center-align">{editingOrderId ? 'Edit Order' : 'Create Order'}</h2>
          <form onSubmit={handleSubmit} className="card-panel">
            <div className="input-field">
              <input
                type="text"
                name="orderOwner"
                id="orderOwner"
                value={orderDetails.orderOwner}
                onChange={handleChange}
                className="validate"
              />
              <label htmlFor="orderOwner" className={orderDetails.orderOwner ? 'active' : ''}>Order Owner</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="orderName"
                id="orderName"
                value={orderDetails.orderName}
                onChange={handleChange}
                className="validate"
              />
              <label htmlFor="orderName" className={orderDetails.orderName ? 'active' : ''}>Order Name</label>
            </div>
            <div className="input-field">
              <textarea
                name="orderDescription"
                id="orderDescription"
                value={orderDetails.orderDescription}
                onChange={handleChange}
                className="materialize-textarea"
              />
              <label htmlFor="orderDescription" className={orderDetails.orderDescription ? 'active' : ''}>Order Description</label>
            </div>
            <div className="input-field">
              <input
                type="date"
                name="estimatedDateOfDelivery"
                id="estimatedDateOfDelivery"
                value={orderDetails.estimatedDateOfDelivery}
                onChange={handleChange}
                readOnly
              />
              <label htmlFor="estimatedDateOfDelivery" className="active">Estimated Delivery Date</label>
            </div>
            {orderDetails.orderStatus.map((status, index) => (
              <div key={index} className="card-panel grey lighten-4">
                <div className="input-field">
                  <input
                    type="text"
                    name="status"
                    id={`status-${index}`}
                    value={status.status}
                    onChange={(e) => handleStatusChange(index, e)}
                    className="validate"
                  />
                  <label htmlFor={`status-${index}`} className={status.status ? 'active' : ''}>Status</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="description"
                    id={`description-${index}`}
                    value={status.description}
                    onChange={(e) => handleStatusChange(index, e)}
                    className="validate"
                  />
                  <label htmlFor={`description-${index}`} className={status.description ? 'active' : ''}>Description</label>
                </div>
                <div className="input-field">
                  <input
                    type="date"
                    name="date"
                    id={`date-${index}`}
                    value={status.date}
                    onChange={(e) => handleStatusChange(index, e)}
                    className="validate"
                  />
                  <label htmlFor={`date-${index}`} className="active">Date</label>
                </div>
                <button type="button" className="btn red" onClick={() => removeStatus(index)}>
                  Remove
                  <i className="material-icons right">remove</i>
                </button>
              </div>
            ))}
            <div className="button-group">
              <button type="button" className="btn waves-effect waves-light" onClick={addStatus}>
                Add Status
                <i className="material-icons right">add</i>
              </button>
              <button className="btn waves-effect waves-light" type="submit" name="action" style={{ marginLeft: '10px' }}>
                {editingOrderId ? 'Update Order' : 'Create Order'}
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
          <h2 className="center-align">Orders</h2>
          <ul className="collection">
            {orders.map((order) => (
              <li key={order._id} className="collection-item" style={{lineHeight: '2.5rem'}}>
                <div>
                  {order.orderNumber}
                  <button className="btn-small blue right" onClick={() => handleEdit(order)}>
                    Edit
                    <i className="material-icons right">edit</i>
                  </button>
                  <button className="btn-small red right" onClick={() => handleDelete(order._id)} style={{ marginRight: '10px' }}>
                    Delete
                    <i className="material-icons right">delete</i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;