import { PREFIX } from "../../constants/classes-names";
import React from "react";

const Caption = ({
  fsLightbox: {
    props: { captions },
  },
  stageIndex,
}) => {
  const caption = captions[stageIndex];
  return (
    <div
      title={`${PREFIX}-caption`}
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        paddingBottom: "12px",
        paddingLeft: "12px",
      }}
    >
      <div style={{ color: "white", fontSize: "16px" }}>{caption}</div>
    </div>
  );
};

export default Caption;
