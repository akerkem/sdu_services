import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type PopularCourses = {
  ders_kod: string;
  year: string;
  term: string;
};

const PopularTeachersResults = ({ ders_kod, year, term }: PopularCourses) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/find_most_popular_teachers/${ders_kod.replace(
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
          pageSize: 3,
          position: ["topRight", "topRight"],
        }}
        dataSource={data}
      >
        <Column
          title={<b>Teacher</b>}
          dataIndex="EMP_ID"
          render={(text: any) => <a href="/#">{text}</a>}
        />
        <Column
          title={<b>Pace</b>}
          dataIndex="REG_COUNT"
        />
        <Column
          title={<b>Difference</b>}
          dataIndex="DIFF"
          render={(text: any) => `${text.toFixed(2)}%`}
        />
      </Table>
    </>
  );
};

export default PopularTeachersResults;
