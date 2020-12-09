import axios from "axios";
import { Formik } from "formik";
import { Form, AutoComplete, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../Services/url";
import { TeacherScheduleSchema } from "../../Utils/ValidationSchema/validation";
import LoaderComponent from "../Loader/Loader";
import LoadingModal from "../Modal/LoadingModal";
import BestFlowResults from "../Results/BestFlow";
import "./Fields.css";

const spanStyle = { marginLeft: "0.25vh", fontSize: "1.5rem" };

const FindeBestFlow = () => {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<string[]>([]);
  const [emps, setEmps] = useState<string[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [emp, setEmp] = useState("");
  const [kods, setKods] = useState<string[]>([]);
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
    setTable(<BestFlowResults emp_id={values.emp_id} year={values.year} term={values.term} ders_kod={values.ders_kod} />)
  }
  async function getStuds() {
    const datas = await axios(`${API_URL}/services/emp_ids/${year},${term}`);
    const temp: string[] = [];
    datas.data
      .filter((e: { EMP_ID: string }) => e.EMP_ID !== null)
      .map((e: { EMP_ID: string }) => temp.push(e.EMP_ID.toString()));
    setEmps(temp);
  }
  async function getKods() {
    const datas = await axios(`${API_URL}/services/ders_kods/${emp}`);
    const temp: string[] = [];
    datas.data
      .filter((e: { DERS_KOD: string }) => e.DERS_KOD !== null)
      .map((e: { DERS_KOD: string }) => temp.push(e.DERS_KOD));
    setKods(temp);
  }
  useEffect(() => {
    if (years.includes(year) && terms.includes(term)) {
      setModalLoading(true);
      getStuds();
      setModalLoading(false);
    }
  }, [year, term]);
  
  useEffect(() => {
    if (emps.includes(emp)) {
      setModalLoading(true);
      getKods();
      setModalLoading(false);
    }
  }, [emp]);
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
          validationSchema={TeacherScheduleSchema}
          initialValues={{
            year: undefined,
            term: undefined,
            emp_id: undefined,
            ders_kod: undefined,
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
              <Form.Item name="emp_id">
                <span style={spanStyle}>Teacher ID</span>
                <AutoComplete
                  style={{
                    marginTop: "1vh",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                  name="emp_id"
                  placeholder="Teacher ID"
                  dataSource={emps}
                  showArrow
                  allowClear
                  filterOption={(value, option) =>
                    option?.value.toUpperCase().indexOf(value.toUpperCase()) !==
                    -1
                  }
                  onChange={e => setEmp(e)}
                />
              </Form.Item><Form.Item name="ders_kod">
                <span style={spanStyle}>Subject</span>
                <AutoComplete
                  style={{
                    marginTop: "1vh",
                    fontSize: "1.25rem",
                    textAlign: "left",
                  }}
                  name="ders_kod"
                  placeholder="Subject"
                  dataSource={kods}
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

export default FindeBestFlow;
