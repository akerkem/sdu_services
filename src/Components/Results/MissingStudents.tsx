import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type MissingStudentsProps = {
  year: string;
  term: string;
};

const MissingStudentsResult = ({ year, term }: MissingStudentsProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/find_missing_students/${year},${term}`
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
          title={<b>Students</b>}
          dataIndex="STUD_ID"
          render={(text: any) => <a href="/#">{text}</a>}
        />
      </Table>
    </>
  );
};

export default MissingStudentsResult;
