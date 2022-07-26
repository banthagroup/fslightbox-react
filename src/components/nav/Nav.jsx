import React, { useState } from "react";
import Toolbar from "./toolbar/Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import Caption from "./Caption.jsx";
import { PREFIX } from "../../constants/classes-names";

const Nav = ({ fsLightbox }) => {
  const [_, setSlideNumber] = useState(fsLightbox.stageIndexes.current + 1);
  fsLightbox.componentsServices.setSlideNumber = (number) => {
    setSlideNumber(number);
  };
  return (
    <div className={`${PREFIX}nav`}>
      <Toolbar fsLightbox={fsLightbox} />
      {fsLightbox.props.sources.length > 1 && (
        <>
          <SlideNumber
            fsLightbox={fsLightbox}
            stageIndex={fsLightbox.stageIndexes.current}
          />
          <Caption
            fsLightbox={fsLightbox}
            stageIndex={fsLightbox.stageIndexes.current}
          />
        </>
      )}
    </div>
  );
};
export default Nav;
