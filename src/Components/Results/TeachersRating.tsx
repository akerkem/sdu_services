import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Services/url";
import LoaderComponent from "../Loader/Loader";

export type TeachersRatingProps = {
  year: string;
  term: string;
};

const TeachersRatingResults = ({ year, term }: TeachersRatingProps) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let datas = await axios(
      `${API_URL}/services/find_teachers_rating/${year},${term}`
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
          title={<b>Teacher</b>}
          dataIndex="EMP_ID"
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

export default TeachersRatingResults;
