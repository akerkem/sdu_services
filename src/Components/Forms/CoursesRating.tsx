import axios from "axios";
import { Formik } from "formik";
import { Form, AutoComplete, SubmitButton } from "formik-antd";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../Services/url";
import { PopularCoursesSchema } from "../../Utils/ValidationSchema/validation";
import LoaderComponent from "../Loader/Loader";
import CoursesRatingResults from "../Results/CoursesRating";
import "./Fields.css";

const spanStyle = { marginLeft: "0.25vh", fontSize: "1.5rem" };

const CoursesRating = () => {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<string[]>([]);
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
    setTable(<CoursesRatingResults year={values.year} term={values.term} />);
  }
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
          validationSchema={PopularCoursesSchema}
          initialValues={{
            year: undefined,
            term: undefined,
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
    </>
  );
};

export default CoursesRating;
