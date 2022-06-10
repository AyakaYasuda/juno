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
        <label className="text-Pink-default">First Name</label>
        <input type="text" className="InputBorder" />
        <label className="text-Pink-default">Last Name</label>
        <input type="text" className="InputBorder" />
        <label className="text-Pink-default">Email</label>
        <input type="email" className="InputBorder" />
        <label className="text-Pink-default">Password</label>
        <input type="password" className="InputBorder" />
      </Form>
    </TopLayout>
  );
}

export default AdminRegister;
