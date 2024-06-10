import React from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import logo from "./logo_bmkg.png";
import ttd from "./ttd_footer.jpg";
import ttd1 from "./ttd.png";

import FontArialRegular from "../fonts/arial-mt/ARIALMTMEDIUM.TTF"
import FontArialBold from "../fonts/arial-mt/ARIALMTEXTRABOLD.TTF"

Font.register({
  family: 'Arial',
  fonts: [
    {
      src: FontArialRegular,
      fontWeight: 'normal',
    },
    {
      src: FontArialBold,
      fontWeight: 'bold',
    }
  ]
})

const Laporan = ({ dataForm, images , ttdImage}) => {
  const formatDate = () => {
    const date = new Date(dataForm.kegiatan[0].tglPelaksanaan);
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const formatted = new Intl.DateTimeFormat("id-ID", options)
      .format(date)
      .replace(/\//g, " ");

    return formatted;
  };

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
      fontFamily: "Arial",
      color: "black"
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: {
      flexDirection: "row",
      marginTop: 24,
    },

    logo: { width: 60 },

    reportTitle: {
      fontSize: 14,
      textAlign: "center",
      fontWeight: "bold",
      alignItems: "center",
    },

    addressTitle: { fontSize: 11, fontStyle: "bold" },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: "bold", fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View
      fixed
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "-19",
        marginHorizontal: "-40",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#bfbfbf",
        borderBottom: "3px groove black",
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 60,
            marginRight: 10,
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image style={styles.logo} src={logo} />
          <Text
            style={{
              fontWeight: "extrabold",
              marginTop: 3,
              textAlign: "center",
            }}
          >
            BMKG
          </Text>
        </View>
        <View>
          <View
            style={{
              width: "75%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              STASIUN KLIMATOLOGI ACEH
            </Text>
          </View>
          <View
            style={{
              fontSize: 9,
              lineHeight: 1.5,
              marginTop: 3,
              width: "75%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              JI. Banda Aceh - Medan Km. 27,5 lndrapuri, Aceh Besar. Telp: 0811
              6815162
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              E-Mail: staklim.aceh@bmkg.go.id
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Pelaksana = () => (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontWeight: "extrabold",
        }}
      >
        PEGAWAI YANG MELAKSANAKAN TUGAS
      </Text>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {/* <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              paddingRight: 5,
            }}
          >
            <Text>1.</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingRight: 30,
            }}
          >
            <Text>Nama</Text>
            <Text>NIP</Text>
            <Text>Pangkat/Golongan</Text>
            <Text>Jabatan</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>: Nizar Purnama, S.Kom.,M.T</Text>
            <Text>: 198512232006041002</Text>
            <Text>: Penata Tk.1 /III-d</Text>
            <Text>: PMG Muda</Text>
          </View>
        </View> */}
        {dataForm.pelaksana.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                paddingRight: 5,
              }}
            >
              <Text>{`${i + 1}.`}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                paddingRight: 30,
              }}
            >
              <Text>Nama</Text>
              <Text>NIP</Text>
              <Text>Pangkat/Golongan</Text>
              <Text>Jabatan</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text>{`: ${item.nama}`}</Text>
              <Text>{`: ${item.nip}`}</Text>
              <Text>{`: ${item.pangkat}`}</Text>
              <Text>{`: ${item.jabatan}`}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const TujuanJadwal = () => (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontWeight: 700,
        }}
      >
        TUJUAN DAN JADWAL KEGIATAN
      </Text>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              paddingRight: 30,
            }}
          >
            <Text>Tempat Tujuan</Text>
            <Text>Hari/Tanggal Pelaksanaan</Text>
            <Text>Tujuan</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>{`: ${dataForm.kegiatan[0].tempatTujuan}`}</Text>
            <Text>: {formatDate()}</Text>
            <Text>{`: ${dataForm.kegiatan[0].tujuan}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Spesifikasi = () => (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontWeight: "extrabold",
        }}
      >
        SPESIFIKASI ALAT
      </Text>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              paddingRight: 100,
            }}
          >
            <Text>Nama</Text>
            <Text>merk</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>{`: ${dataForm.alat[0].nama}`}</Text>
            <Text>{`: ${dataForm.alat[0].merk}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Hasil = () => (
    <View
      style={{
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
      }}
      break
    >
      <Text
        style={{
          textAlign: "left",
          fontWeight: "extrabold",
        }}
      >
        HASIL KEGIATAN
      </Text>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>Kondisi Awal</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 30,
            }}
          >
            {dataForm.kondisiawal.map((e, i) => (
              <View style={{ flexDirection: "row" }} key={i}>
                <Text style={{ paddingRight: 8 }}>-</Text>
                <Text>{e.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>Perbaikan</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 30,
            }}
          >
            {dataForm.perbaikan.map((e, i) => (
              <View style={{ flexDirection: "row" }} key={i}>
                <Text style={{ paddingRight: 8 }}>-</Text>
                <Text>{e.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const Dokumentasi = () =>
    images.map((e, i) => (
      <View
        key={i}
        style={{
          width: 200,
          objectFit: "contain",
          paddingVertical: 5,
        }}
      >
        <Image src={e} />
      </View>
    ));

  const Footer = () => (
    <View
      fixed
      style={{
        flexDirection: "column",
        width: "100%",
        position: "absolute",
        bottom: 10,
        left: 30,
      }}
    >
      <View
        style={{
          marginBottom: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginRight: 10,
          }}
        >
          <Image
            style={{
              width: 35,
            }}
            src={ttd}
          />
        </View>
        <View
          style={{
            fontSize: 9,
            borderTop: "1px solid black",
            textAlign: "center",
            paddingTop: 2,
            paddingHorizontal: 5,
            width: "70%",
          }}
        >
          <Text
            style={{
              fontSize: 9,
              textAlign: "center",
            }}
          >
            Dokumen ini telah ditandatangani secara elektronik menggunakan
            sertifikat elektronik
          </Text>
          <Text
            style={{
              fontSize: 9,
              textAlign: "center",
            }}
          >
            yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), Badan
            Siber dan Sandi Negara
          </Text>
        </View>
      </View>
    </View>
  );

  const today = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString("id-ID", options);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <InvoiceTitle />
        <View>
          <Text
            style={{
              marginTop: 24,
              textAlign: "center",
              fontWeight: "extrabold",
            }}
          >
            LAPORAN KEGIATAN PERBAIKAN PERALATAN
          </Text>
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Pelaksana />
            <TujuanJadwal />
            <Spesifikasi />
            <Hasil />
          </View>
        </View>
        <View
          break
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            lineHeight: 1.5,
          }}
        >
          <Text>
            Setelah dilakukan perbaikan alat dapat beroperasional dengan baik
            dengan catatan tetap dipantau data pengamatannya beberapa waktu
            kedepan.
          </Text>
          <Text
            style={{
              paddingTop: 20,
              textIndent: 50,
            }}
          >
            Demikian laporan ini dibuat untuk dapat dipergunakan sebagai mana
            mestinya.
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 50,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>Pelaksana,</Text>
              {dataForm.pelaksana.map((item, i) => (
                <View style={{ flexDirection: "row" }} key={i}>
                  <Text>{i + 1}. </Text>
                  <Text>{item.nama}</Text>
                </View>
              ))}
            </View>
            <View
              style={{
                paddingRight: 80,
              }}
            >
              <Text>Aceh Besar, {formattedDate}</Text>
              <Text>Ketua Tim Teknisi</Text>
              <Image src={ttdImage[0]} style={{ width: 70, height:70 }} />
              <Text style={{
                textDecoration: "underline"
              }}>Nizar Purnama, S.Kom.,M.T</Text>
              <Text>NIP. 198512232006041002</Text>
            </View>
          </View>
        </View>

        <View
          break
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontWeight: "extrabold",
            }}
          >
            Dokumentasi Perbaikan PM 2.5
          </Text>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Dokumentasi />
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default Laporan;
