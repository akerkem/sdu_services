import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type GPAProps = {
  stud_id: string;
  year: string;
  term: string;
};

const GPAResults = ({ year, term, stud_id }: GPAProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    await axios(
      `${API_URL}/services/calculate_gpa/${stud_id},${year},${term}`
    ).then((datas) => setData(datas.data)).catch((error) => alert(error));

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
          title={<b>Student</b>}
          dataIndex="STUD_ID"
          render={(text: any) => <a href="/#">{text}</a>}
        />
        <Column
          title={<b>GPA</b>}
          dataIndex="GPA"
          render={(text: any) => `${text.toFixed(2)}`}
        />
        <Column
          title={<b>SPA</b>}
          dataIndex="SPA"
          render={(text: any) => text !== null ? `${text.toFixed(2)}` : text}
        />
      </Table>
    </>
  );
};

export default GPAResults;
