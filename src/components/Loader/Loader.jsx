import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines width="100" strokeColor="#3f51b5" />
    </div>
  );
};

export default Loader;
