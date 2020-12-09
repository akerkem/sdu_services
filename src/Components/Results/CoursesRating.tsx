import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type CoursesRatingProps = {
  year: string;
  term: string;
};

const CoursesRatingResults = ({ year, term }: CoursesRatingProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/courses_rating/${year},${term}`
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
          title={<b>Rating</b>}
          dataIndex="AVERAGE_RATING"
          render={(text: any) => `${Math.round(parseFloat(text) * 100)/100}%`}
        />
      </Table>
    </>
  );
};

export default CoursesRatingResults;
