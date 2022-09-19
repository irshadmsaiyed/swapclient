import React from 'react';
import StudentForm from '../../parts/student/StudentForm';
import Layout from '../../components/layout';

import { getStudentById } from '../../services/StudentServices';

function EditStudent({ data }) {
  const [student] = data;
  return (
    <Layout>
      {student ? <StudentForm data={student} /> : <div>No record found</div>}
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
    const data = await getStudentById(id);
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
  }
}

export default EditStudent;
