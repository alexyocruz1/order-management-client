import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';

const Customer = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }, [order]);

  const handleChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderNumber}`);
      setOrder(response.data);
      M.toast({ html: 'Order retrieved successfully!', classes: 'green' });
    } catch (error) {
      M.toast({ html: 'Failed to retrieve order. Please try again.', classes: 'red' });
    }
  };

  const statusIcons = {
    captured: 'assignment_turned_in',
    processed: 'build',
    'waiting for delivery': 'hourglass_empty',
    'on the way': 'local_shipping',
    delivered: 'home',
    complete: 'check_circle'
  };

  const statusDescriptions = {
    captured: 'Your order has been captured in our system and we will get it ready to be processed.',
    processed: 'Your order is being processed with the right information to get it ready for deliver.',
    'waiting for delivery': 'Your order is waiting for a delivery carrier in the facility.',
    'on the way': 'Your order is on the way to you right now.',
    delivered: 'Your order has been delivered to you directly.',
    complete: 'Your order is complete and we received the confirmation that you got it.'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString();
  };

  return (
    <div className="container">
      <h2 className="center-align">Track your order</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input type="text" name="orderNumber" onChange={handleChange} />
            <label htmlFor="orderNumber">Order Number</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button type="submit" className="btn waves-effect waves-light">Get Order</button>
          </div>
        </div>
      </form>
      {order && (
        <div className="row">
          <div className="col s12">
            <h3>Order Details</h3>
            <p><strong>Order Owner:</strong> {order.orderOwner}</p>
            <p><strong>Order Name:</strong> {order.orderName}</p>
            <p><strong>Estimated Date of Delivery:</strong> {formatDate(order.estimatedDateOfDelivery)}</p>
            <p><strong>Order Description:</strong></p>
            <textarea className="materialize-textarea" readOnly value={order.orderDescription}></textarea>
            <ul className="collapsible">
              {order.orderStatus
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((status, index) => (
                  <li key={index}>
                    <div className="collapsible-header">
                      <i className="material-icons">{statusIcons[status.status]}</i>
                      <span style={{textTransform: 'capitalize'}}>
                        {status.status}
                      </span>
                      <span style={{ marginLeft: 'auto', textAlign: 'end', display: 'inline-block', width: '100px' }}>
                        {formatDate(status.date)}
                      </span>
                    </div>
                    <div className="collapsible-body">
                      <span>{status.description}</span>
                      <hr />
                      <span>{statusDescriptions[status.status]}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;