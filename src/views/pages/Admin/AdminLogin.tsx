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
        params="/admin/register"
      >
        <label className="pt-8">Email</label>
        <input type="email" className="InputBorder mb-16" />
        <label>Password</label>
        <input type="password" className="InputBorder mb-20" />
      </Form>
    </TopLayout>
  );
}

export default AdminLogin;
