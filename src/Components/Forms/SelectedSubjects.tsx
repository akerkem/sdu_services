import axios from "axios";
import { Formik } from "formik";
import { Form, AutoComplete, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../Services/url";
import { GPASchema } from "../../Utils/ValidationSchema/validation";
import LoaderComponent from "../Loader/Loader";
import LoadingModal from "../Modal/LoadingModal";
import SelectedSubjectsResults from "../Results/SelectedSubjects";
import "./Fields.css";

const spanStyle = { marginLeft: "0.25vh", fontSize: "1.5rem" };

const SelectedSubjects = () => {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<string[]>([]);
  const [studs, setStuds] = useState<string[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const terms = ["1", "2", "3"];
  async function getAll() {
    setLoading(true);
    const datas = await axios(`${API_URL}/services/years`);
    const temp: string[] = [];
    datas.data.map((e: { YEAR: string }) => temp.push(e.YEAR.toString()));
    setYears(temp);
    setLoading(false);
  }
  const [table, setTable] = useState<any>([]);
  async function getPopularCourses(values: any) {
    setTable([]);
    setTable(
      <SelectedSubjectsResults 
        stud_id={values.stud_id}
        year={values.year}
        term={values.term}
      />
    );
  }
  async function getStuds() {
    const datas = await axios(`${API_URL}/services/stud_ids/${year},${term}`);
    const temp: string[] = [];
    datas.data
      .filter((e: { STUD_ID: string }) => e.STUD_ID !== null)
      .map((e: { STUD_ID: string }) => temp.push(e.STUD_ID));
    setStuds(temp);
  }
  useEffect(() => {
    if (years.includes(year) && terms.includes(term)) {
      setModalLoading(true);
      getStuds();
      setModalLoading(false);
    }
  }, [year, term]);
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        <LoaderComponent />
      ) : (
        <Formik
          validationSchema={GPASchema}
          initialValues={{
            year: undefined,
            term: undefined,
            stud_id: undefined,
          }}
          onSubmit={(values, { resetForm }) => {
            getPopularCourses(values);
            resetForm({});
          }}
        >
          {({ errors, touched }) => (
            <Form className="narrowed-form" style={{ padding: "0 20vw" }}>
              <Form.Item name="year">
                <span style={spanStyle}>Year</span>
                <AutoComplete
                  style={{
                    marginTop: "1vh",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                  name="year"
                  placeholder="Year"
                  dataSource={years}
                  showArrow
                  allowClear
                  filterOption={(value, option) =>
                    option?.value.toUpperCase().indexOf(value.toUpperCase()) !==
                    -1
                  }
                  onChange={(e) => {
                    setYear(e);
                  }}
                />
              </Form.Item>
              <Form.Item name="term">
                <span style={spanStyle}>Term</span>
                <AutoComplete
                  style={{
                    marginTop: "1vh",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                  name="term"
                  placeholder="Term"
                  dataSource={terms}
                  showArrow
                  allowClear
                  filterOption={(value, option) =>
                    option?.value.toUpperCase().indexOf(value.toUpperCase()) !==
                    -1
                  }
                  onChange={(e) => {
                    setTerm(e);
                  }}
                />
              </Form.Item>
              <Form.Item name="stud_id">
                <span style={spanStyle}>Student ID</span>
                <AutoComplete
                  style={{
                    marginTop: "1vh",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                  name="stud_id"
                  placeholder="Student ID"
                  dataSource={studs}
                  showArrow
                  allowClear
                  filterOption={(value, option) =>
                    option?.value.toUpperCase().indexOf(value.toUpperCase()) !==
                    -1
                  }
                />
              </Form.Item>
              <div>
                <SubmitButton style={{ marginRight: "1%" }}>
                  Search
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div style={{ padding: "0 10vw", paddingTop: "7.5vh" }}>{table}</div>
      <LoadingModal visible={modalLoading} />
    </>
  );
};

export default SelectedSubjects;
