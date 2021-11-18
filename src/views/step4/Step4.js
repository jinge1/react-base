import { useEffect, useRef, useState, useCallback } from "react";

import girl from "@/assets/girl.jpeg";
// import screen from "@/assets/screen.jpg";
// import girl from "@/assets/mei.jpeg";
import AccurateCropper from "./AccurateCropper";

function Step4() {
  return (
    <div style={{ height: 300 }}>
      <AccurateCropper src={girl} height={300}></AccurateCropper>
    </div>
  );
}

export default Step4;
