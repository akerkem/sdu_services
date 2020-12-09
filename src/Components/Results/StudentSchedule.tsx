import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type StudentScheduleProps = {
  stud_id: string;
  year: string;
  term: string;
};

const StudentScheduleResults = ({
  stud_id,
  year,
  term,
}: StudentScheduleProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/create_student_schedule/${stud_id},${year},${term}`
    );
    setData(datas.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoaderComponent />
  ) : (
    <>
      <h1>Results</h1>
      <Table
        pagination={{
          pageSize: 25,
          position: ["topRight", "topRight"],
        }}
        dataSource={data}
      >
        <Column
          title={<b>Subject</b>}
          dataIndex="DERS_KOD"
          render={(text: any) => <a href="#">{text}</a>}
        />
        <Column title={<b>Section</b>} dataIndex="SECTION" />
        <Column title={<b>Day</b>} dataIndex="DAY" />
        <Column
          title={<b>Start time</b>}
          dataIndex="START_TIME"
          render={(text: any) => <b>{`${text}:00`}</b>}
        />
      </Table>
    </>
  );
};

export default StudentScheduleResults;
