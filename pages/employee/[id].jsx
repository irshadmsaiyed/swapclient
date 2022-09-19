import React from 'react';
import Layout from '../../components/layout';
import EmployeeForm from '../../parts/employee/EmployeeForm';

import { getEmployeeById } from '../../services/EmployeeServices';

function EditEmployee({ data }) {
  const [employee] = data;
  return (
    <Layout>
      {employee ? <EmployeeForm data={employee} /> : <div>No record found</div>}
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const { id } = params;
  try {
    const data = await getEmployeeById(id);
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
}

export default EditEmployee;
