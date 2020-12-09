import { AutoComplete } from "antd";
import React, { useEffect, useState } from "react";
import { selectValues } from "../../Services/values";
import "./ServiceContent.css";

const ServiceContent = () => {
  const [selection, setSelection] = useState<any>([]);
  const [values, setValues] = useState<any[]>([]);

  useEffect(() => {
    const temp: string[] = [];
    selectValues.map((e) => 
      temp.push(e.label)
    );
    setValues(temp);
  }, []);

  const setComponent = (val: string) => {
    setSelection([]);
    console.log(selectValues.find((e) => (e.label === val))?.key);
    setSelection(selectValues.find((e) => (e.label === val))?.component);
  };
  return (
    <div className="service-container">
      <h1 className="label">Select Service</h1>
      <div className="select-container">
        <AutoComplete
          style={{
            marginTop: "1vh",
            fontSize: "1.25rem",
            textAlign: "left",
            width: "100%",
          }}
          allowClear
          placeholder={"Select Service"}
          dataSource={values}
          showArrow
          onChange={setComponent}
        />
      </div>
      <div style={{marginTop: "5vh"}}>
        {selection}
      </div>
    </div>
  );
};

export default ServiceContent;
