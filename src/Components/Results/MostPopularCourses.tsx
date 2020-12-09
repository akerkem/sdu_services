import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type PopularCourses = {
  year: string;
  term: string;
};

const PopularCoursesResults = ({ year, term }: PopularCourses) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/find_most_popular_courses/${year},${term}`
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

export default PopularCoursesResults;
