import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type SelectedSubjectsProps = {
  stud_id: string;
  year: string;
  term: string;
};

const SelectedSubjectsResults = ({
  stud_id,
  year,
  term,
}: SelectedSubjectsProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const datas = await axios(
      `${API_URL}/services/find_selected_subjects/${stud_id},${year},${term}`
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
          title={<b>Number of Subjects</b>}
          dataIndex="SUBJECTS_COUNT"
          render={(text: any) => <b>{text}</b>}
        />
        <Column
          title={<b>Credits</b>}
          dataIndex="CREDITS_COUNT"
          render={(text: any) => <b>{ text }</b>}
        />
      </Table>
    </>
  );
};

export default SelectedSubjectsResults;
