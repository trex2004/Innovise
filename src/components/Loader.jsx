export default function Loader() {
return (
    
    <div className="tw-flex tw-flex-row tw-gap-2 tw-justify-center tw-w-full tw-h-full">
    <div className="tw-animate-pulse tw-bg-[#5fa3a3] tw-rounded-full  tw-w-20" /> {/* 1/5 of parent width */}
    <div className="tw-flex tw-flex-col tw-gap-2 tw-flex-grow">
      <div className="tw-animate-pulse tw-bg-[#5fa3a3] tw-rounded-full tw-w-full tw-h-[5vh]" /> {/* Full width, 3vh height */}
      <div className="tw-animate-pulse tw-bg-[#5fa3a3]  tw-rounded-full tw-w-full tw-h-[5vh]" /> {/* Full width, 3vh height */}
    </div>
  </div>
  
      
);
};