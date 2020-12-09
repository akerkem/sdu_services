import { Button } from "antd";
import React, { useState } from "react";
import ProfitResults from "../Results/Profit";
import "./Fields.css";

const Profit = () => {
  const [table, setTable] = useState<any>([]);
  async function getCash() {
    setTable([]);
    setTable(<ProfitResults />);
  }
  return (
    <>
      <Button type="primary" onClick={getCash}>Calculate cash</Button>
      <div style={{ padding: "0 10vw", paddingTop: "7.5vh" }}>{table}</div>
    </>
  );
};

export default Profit;
