import React from "react";
import myvideo3 from "../assets/video3.mp4";

function SideVideo() {
  return (
    <>
      <div className="tw-flex-grow-0 tw-flex-shrink-0 tw-w-[55vw] tw-h-auto">
        {myvideo3? ( <video
          src={myvideo3}
          className="tw-w-[55vw] tw-h-full tw-absolute tw-left-[-0.5px] tw-top-[-0.5px] tw-object-cover transform hover:tw-scale-105 tw-opacity-40"
          style={{ boxShadow: "7px 0px 20px 0 rgba(0,0,0,0.15)" }}
          autoPlay
          loop
          muted
        />):<div></div>}
        <p className="tw-z-19 tw-w-[55vw] tw-h-[213px] tw-absolute tw-left-[46px] tw-top-[99px] tw-text-[4vi] tw-font-black tw-italic tw-text-left tw-text-white/[0.8]">
          Find Your Place,<br/> Build Your Community.
        </p>
        <div className="tw-absolute tw-inset-y-0 tw-right-[45vw] tw-w-1/4 tw-bg-gradient-to-l tw-from-[#111] tw-to-transparent tw-z-10"></div>
      </div>
    </>
  );
}

export default SideVideo;