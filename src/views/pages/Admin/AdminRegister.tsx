import React from 'react';
import TopLayout from 'views/components/atomic/templates/TopLayout';
import Form from 'views/components/atomic/molecules/Form';

function AdminRegister() {
  return (
    <TopLayout>
      <h2 className="mb-4">Create your account</h2>
      <Form
        ctaText="Start Creating Invitations"
        linkText="You already have an account?"
        params="/admin/login"
      >
        <label>First Name</label>
        <input type="text" />
        <label>Last Name</label>
        <input type="text" />
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
      </Form>
    </TopLayout>
  );
}

export default AdminRegister;
