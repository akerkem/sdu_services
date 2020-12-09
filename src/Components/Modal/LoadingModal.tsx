import { Modal } from "antd";
import React from "react";
import LoaderComponent from "../Loader/Loader";
import "./LoadingModal.css";

export type LoadingModalProps = {
  visible: boolean;
};

const LoadingModal = ({ visible }: LoadingModalProps) => {
  return (
    <Modal title="Wait for it..." visible={visible} className="loading-modal">
      <div style={{ margin: "11% 0 11% 40%", }}>
        <LoaderComponent />
        <p style={{marginTop: "10%"}}>We loading data</p>
      </div>
    </Modal>
  );
};

export default LoadingModal;
