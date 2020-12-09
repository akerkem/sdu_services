import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { copyright } from "../../Services/copyright";
import "./Copyright.css";

const Copyright = () => {
  const [background, setBackground] = useState("");
  const [license, setLicense] = useState<string[]>([]);

  useEffect(() => {
    setBackground(copyright.background);
    const names = copyright.names;
    const temp = names.join(" and ").split(" ");
    setLicense(temp);
  }, []);
  return (
    <div
      className="copyright-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="license-container">
        <h1 className="logo">DBMS2 | Project</h1>
        <h1 className="big-bold">Performed by</h1>
        {license.map((e, index) => (
          <h1 key={index} className={e === "and" ? "and" : ""}>{e.replace(",", " ")}</h1>
        ))}
        <Button
          type="primary"
          style={{
            width: "30%",
            height: "7vh",
            margin: "5vh auto 0 auto",
            fontSize: "1.5rem",
          }}
        >
          Go to Services
        </Button>
      </div>
    </div>
  );
};

export default Copyright;
