import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

const ProfitResults = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    await axios(
      `${API_URL}/services/money_rules_the_world`
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
          title={<b>Failed Credits</b>}
          dataIndex="RETAKES"
          render={(text: any) => <b>{parseFloat(text) * 2}</b>}
        />
        <Column
          title={<b>Profit</b>}
          dataIndex="PROFIT"
          render={(text: any) => `${text}KZT`}
        />
      </Table>
    </>
  );
};

export default ProfitResults;
