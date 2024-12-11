import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="form-container">
      <div>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />
      </div>
      <div>
        <label>Email ID</label>
        <input type="email" placeholder="Enter your email ID" />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" pattern="\d{10}" title="Please enter exactly 10 digits" placeholder="Enter your phone number" />
      </div>
      <div>
        <label>Message</label>
        <textarea placeholder="Why do you want to contact us?"></textarea>
      </div>
      <div>
      <button type="submit" className='submit-button'>Submit</button>
      </div>
    </div>
  );
};

export default ContactUs;