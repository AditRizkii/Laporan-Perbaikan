import React from "react";
import PdfCard from "../pdf/PdfCard";
import { useLocation } from "react-router-dom";

const PdfPreview = () => {
  const location = useLocation();
  const { dataForm } = location.state || {};
  const { images } = location.state || {};
  const cards = {
    maxWidth: "2000px",
    justifyContent: "center",
    margin: "0 auto",
    display: "grid",
    gap: "1rem",
    padding: "20px",
  };

  const dataCard = {
    pelaksana: dataForm.pelaksana.length,
    kondisiAwal: dataForm.kondisiawal.length,
    perbaikan: dataForm.perbaikan.length,
    kegiatan: dataForm.kegiatan,
  };
  console.log({ dataForm, images });
  return (
    <div className="relative w-full h-full bg-gray-900">
      <div className="flex flex-col gap-4 place-content-center h-screen">
        <h2
          style={{ textAlign: "center" }}
          className="relative z-10 text-xl md:text-3xl text-white pb-2 md:pb-10 lg:pb-20 font-bold"
        >
          PDF Ready To download
        </h2>
        <div className="relative z-10 my-9 md:grid md:gap-4 md:p-5 md:mx-auto md:my-0 bg-slate-100 rounded-lg">
          <PdfCard
            title={`Perbaikan ${dataForm.alat[0].nama}`}
            total={dataCard}
            dataForm={dataForm}
            images={images}
          />
        </div>
      </div>
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
    </div>
  );
};

export default PdfPreview;
