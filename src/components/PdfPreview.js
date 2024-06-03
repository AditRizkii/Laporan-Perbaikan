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
    <div className="grid place-content-center h-screen">
      <h2 style={{ textAlign: "center" }} className="text-xl font-bold">
        PDF Ready To download
      </h2>
      <div className="my-9 md:grid md:gap-4 md:p-5 md:mx-auto md:my-0">
        <PdfCard
          title={`Perbaikan ${dataForm.alat[0].nama}`}
          total={dataCard}
          dataForm={dataForm}
          images={images}
        />
      </div>
    </div>
  );
};

export default PdfPreview;
