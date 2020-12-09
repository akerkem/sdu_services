import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type BestFlowProps = {
  emp_id: string;
  ders_kod: string;
  year: string;
  term: string;
};

const BestFlowResults = ({ emp_id, ders_kod, year, term }: BestFlowProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/find_best_flow/${emp_id},${ders_kod.replace(
        " ",
        "_"
      )},${year},${term}`
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
          title={<b>Section</b>}
          dataIndex="SECTION"
          render={(text: any) => <a href="#">{text}</a>}
        />
        <Column
          title={<b>Curve</b>}
          dataIndex="AVERAGE_RATING"
          render={(text: any) => <b>{`${text}%`}</b>}
        />
      </Table>
    </>
  );
};

export default BestFlowResults;
