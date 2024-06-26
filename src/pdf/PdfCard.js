import React from "react";
import { CgFileDocument } from "react-icons/cg";
import { HiOutlineDownload, HiEye, HiArrowLeft } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Laporan from "./Laporan";

const PdfCard = ({ title, total, dataForm, images }) => {
  const styles = {
    container: {
      borderRadius: "5px",
      padding: "15px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    },
    flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
    bold: { fontSize: "13px", fontWeight: 600 },
    thin: { fontSize: "11px", color: "#6f6f6f", fontWeight: 500 },
    btn: {
      borderRadius: "3px",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "3px",
      fontSize: "11px",
      color: "#4f4f4f",
      fontWeight: 600,
      cursor: "pointer",
      userSelect: "none",
    },
  };

  const handleShare = async (blob) => {
    await saveAs(blob, `invoice.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Invoice`
    )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  };

  return (
    <div style={styles.container} className="w-full md:w-[500px]">
      <div style={styles.flex}>
        <CgFileDocument color="#90e0ef" size={20} />
        <span style={styles.bold}>{title}</span>
      </div>
      <div style={styles.thin}>
        <p>{`Pelaksana : ${total.pelaksana} orang`}</p>
        <p>{`Alat : ${title}`}</p>
        <p>{`Jumlah Kondisi Awal : ${total.kondisiAwal} `}</p>
        <p>{`Jumlah Perbaikan : ${total.perbaikan} `}</p>
        <p>{`Tempat : ${total.kegiatan[0].tempatTujuan} `}</p>
        <p>{`Tanggal : ${total.kegiatan[0].tglPelaksanaan} `}</p>
        <p>{`Tujuan : ${total.kegiatan[0].tujuan} `}</p>
      </div>

      <div style={{ ...styles.flex, ...{ justifyContent: "space-between" } }}>
        <div style={styles.btn}>
          <a href="/" className="flex gap-3">
            <HiArrowLeft size={14} />
            <span>Done</span>
          </a>
        </div>
        <PDFDownloadLink
          document={<Laporan dataForm={dataForm} images={images} />}
          fileName={`${title}.pdf`}
        >
          <div style={styles.btn}>
            <HiOutlineDownload size={14} />
            <span>Download</span>
          </div>
        </PDFDownloadLink>

        <BlobProvider
          document={<Laporan dataForm={dataForm} images={images} />}
        >
          {({ url, blob }) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btn}
            >
              <HiEye size={14} />
              <span>Preview</span>
            </a>
          )}
        </BlobProvider>
      </div>
    </div>
  );
};

export default PdfCard;
