import React from 'react';
import Form from 'views/components/atomic/molecules/Form';
import TopLayout from 'views/components/atomic/templates/TopLayout';

function AdminLogin() {
  return (
    <TopLayout>
      <h2 className="mb-4">Welcome Back</h2>
      <Form
        ctaText="Log In"
        linkText="You don’t have an account yet?"
        params="register"
      >
        <label className="pt-8">Email</label>
        <input type="email" className="mb-16" />
        <label>Password</label>
        <input type="password" className="mb-20" />
      </Form>
    </TopLayout>
  );
}

export default AdminLogin;
