import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { register, handleSubmit, resetField, control } = useForm();

  const {
    fields: pelaksanaFields,
    append: appendPelaksana,
    remove: removePelaksana,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "pelaksana", // unique name for your Field Array
    defaultValue: [{ nama: "", nip: "", pangkat: "", jabatan: "" }],
  });

  const {
    fields: alatFields,
    append: appendAlat,
    remove: removeAlat,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "alat", // unique name for your Field Array
    defaultValue: [{ nama: "", merk: "" }],
  });

  const {
    fields: kegiatanFields,
    append: appendKegiatan,
    remove: removeKegiatan,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "kegiatan", // unique name for your Field Array
    defaultValue: [{ tempatTujuan: "", tglPelaksanaan: "", tujuan: "" }],
  });

  const {
    fields: kondisiawalFields,
    append: appendKondisiAwal,
    remove: removeKondisiAwal,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "kondisiawal", // unique name for your Field Array
    defaultValue: [{ desc: "" }],
  });

  const {
    fields: perbaikanFields,
    append: appendPerbaikan,
    remove: removePerbaikan,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "perbaikan", // unique name for your Field Array
    defaultValue: [{ desc: "" }],
  });

  const {
    fields: imagesFields,
    append: appendImages,
    remove: removeImages,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "images", // unique name for your Field Array
    defaultValue: [{ imageData: "" }],
  });

  const handleReset = () => {
    resetField("pelaksana");
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // const formData = new FormData();
    // for (const file of data.images) {
    //   formData.append("images", file);
    // }
    // formData.append("images", data.images[0]);

    // try {
    //   const response = await fetch("http://localhost:4000/picture", {
    //     method: "POST",
    //     body: formData,
    //   }).then((response) => response.json());

    //   alert(JSON.stringify(response));

    //   // const result = await response.text();
    //   // console.log(result);
    // } catch (error) {
    //   console.error("Error uploading images:", error);
    // }
    console.log({ data });
    navigate("/view-pdf", { state: { dataForm: data, images: filePreviews } });
  };

  const [filePreviews, setFilePreviews] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const formatSelectedDate = (date) => {
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

  const handleFilesChange = (files) => {
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
    appendImages({ imageData: files });
  };

  return (
    <div
      className="w-full flex justify-center"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b5f78",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-2 md:mx-6 my-4 h-full w-6/7 md:w-4/5 flex flex-col gap-3"
        style={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          backgroundColor: "#0b1d32",
          padding: 20,
          borderRadius: "15px",
        }}
      >
        <h1 className="w-full text-center text-xl  md:text-3xl font-bold mb-6 text-white">
          LAPORAN KEGIATAN PERBAIKAN PERALATAN{" "}
        </h1>
        <div className="border border-slate-600 rounded-lg p-2">
          <h3 className=" md:text-xl font-bold text-white py-3">
            PEGAWAI YANG MELAKSANAKAN TUGAS
          </h3>
          {pelaksanaFields.map((field, index) => {
            return (
              <div
                key={`div-${field.id}`}
                className="transition flex flex-col md:flex-row mb-2 border border-slate-700 p-2 md:pl-4 rounded-md shadow-sm"
              >
                <div className="w-full md:w-2/3">
                  <div className="relative z-0 w-full my-5  group">
                    <input
                      type="text"
                      {...register(`pelaksana.${index}.nama`)}
                      name={`pelaksana.${index}.nama`}
                      id={`pelaksana.${index}.nama`}
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor={`pelaksana.${index}.nama`}
                      className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nama
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      {...register(`pelaksana.${index}.nip`, {
                        pattern: {
                          value: /\d{18}/,
                          message: "Please enter a valid nip",
                        },
                      })}
                      name={`pelaksana.${index}.nip`}
                      id={`pelaksana.${index}.nip`}
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      pattern="\d{18}"
                      required
                    />
                    <label
                      htmlFor={`pelaksana.${index}.nip`}
                      className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      NIP
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="underline_select"
                      className="sr-only text-white"
                    >
                      Pangkat/Golongan
                    </label>
                    <select
                      id="underline_select"
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      {...register(`pelaksana.${index}.pangkat`)}
                      required
                    >
                      <option selected value="">
                        Pangkat/Golongan
                      </option>
                      <optgroup
                        label="Golongan II (pengatur)"
                        className="text-black font-bold"
                      >
                        <option
                          className="text-gray-500"
                          value="Pengatur Muda/II-a"
                        >
                          Pengatur Muda/II-a
                        </option>
                        <option
                          className="text-gray-500"
                          value="Pengatur Muda TK.1/II-b"
                        >
                          Pengatur Muda TK.1/II-b
                        </option>
                        <option className="text-gray-500" value="Pengatur/II-c">
                          Pengatur/II-c
                        </option>
                        <option
                          className="text-gray-500"
                          value="Pengatur TK.1/II-d"
                        >
                          Pengatur TK.1/II-d
                        </option>
                      </optgroup>

                      <optgroup
                        label="Golongan III (penata)"
                        className="text-black font-bold"
                      >
                        <option
                          className="text-gray-500"
                          value="Penata Muda/III-a"
                        >
                          Penata Muda/III-a
                        </option>
                        <option
                          className="text-gray-500"
                          value="Penata Muda TK.1/III-b"
                        >
                          Penata Muda TK.1/III-b
                        </option>
                        <option className="text-gray-500" value="Penata/III-c">
                          Penata/III-c
                        </option>
                        <option
                          className="text-gray-500"
                          value="Penata TK.1/III-d"
                        >
                          Penata TK.1/III-d
                        </option>
                      </optgroup>

                      <optgroup
                        label="Golongan IV (pembina)"
                        className="text-black font-bold"
                      >
                        <option
                          className="text-gray-500"
                          value="Pembina Muda/IV-a"
                        >
                          Pembina Muda/IV-a
                        </option>
                        <option
                          className="text-gray-500"
                          value="Pembina Muda TK.1/IV-b"
                        >
                          Pembina Muda TK.1/IV-b
                        </option>
                        <option className="text-gray-500" value="Pembina/IV-c">
                          Pembina/IV-c
                        </option>
                        <option
                          className="text-gray-500"
                          value="Pembina TK.1/IV-d"
                        >
                          Pembina TK.1/IV-d
                        </option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="relative z-0 w-full my-5  group">
                    <input
                      type="text"
                      {...register(`pelaksana.${index}.jabatan`)}
                      name={`pelaksana.${index}.jabatan`}
                      id={`pelaksana.${index}.jabatan`}
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor={`pelaksana.${index}.jabatan`}
                      className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Jabatan
                    </label>
                  </div>
                </div>
                <div className="w-full md:w-1/3 h-[100] mb-3 md:mb-0 flex justify-center items-center">
                  <p className="flex justify-center items-center bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">{`Pelaksana-${
                    index + 1
                  }`}</p>
                </div>
                {index >= 0 && (
                  <div className="w-full md:w-1/3 flex justify-center items-center">
                    <button
                      className="h-fit text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                      type="button"
                      onClick={() => removePelaksana(index)}
                    >
                      Hapus Pelaksana
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
            onClick={() =>
              appendPelaksana({ nama: "", nip: "", pangkat: "", jabatan: "" })
            }
          >
            Tambahkan Pelaksana
          </button>
        </div>
        <div className="border border-slate-600 rounded-lg p-2">
          <h3 className="md:text-xl font-bold text-white">
            TUJUAN DAN JADWAL KEGIATAN
          </h3>
          <div>
            <div className="relative z-0 w-full my-5  group">
              <input
                type="text"
                {...register(`kegiatan.0.tempatTujuan`)}
                name={`kegiatan.0.tempatTujuan`}
                id={`kegiatan.0.tempatTujuan`}
                className="block py-2.5 px-0 w-full md:w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={`kegiatan.0.tempatTujuan`}
                className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tempat Tujuan
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
                className=" w-full md:w-1/2"
              >
                <label htmlFor="" className="text-white">
                  Hari/Tanggal Pelaksanaan
                </label>
                <input
                  type="date"
                  {...register("kegiatan.0.tglPelaksanaan")}
                  style={{
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    border: "0",
                    borderRadius: "5px",
                  }}
                  className="p-2 w-full"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setFormattedDate(formatSelectedDate(date));
                  }}
                  required
                />
              </div>

              <p className="flex items-end justify-start md:justify-end md:p-2 text-white">
                {formattedDate}
              </p>
            </div>

            <div className="relative z-0 w-full my-5  group">
              <input
                type="text"
                {...register(`kegiatan.0.tujuan`)}
                name={`kegiatan.0.tujuan`}
                id={`kegiatan.0.tujuan`}
                className="block py-2.5 px-0 w-full md:w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={`kegiatan.0.tujuan`}
                className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tujuan
              </label>
            </div>
          </div>
        </div>

        <div className="border border-slate-600 rounded-lg p-2">
          <h3 className="md:text-xl font-bold text-white">SPESIFIKASI ALAT</h3>
          <div className="relative z-0 w-full my-5  group">
            <input
              type="text"
              {...register(`alat.0.nama`)}
              name={`alat.0.nama`}
              id={`alat.0.nama`}
              className="block py-2.5 px-0 w-full md:w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor={`alat.0.nama`}
              className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nama
            </label>
          </div>
          <div className="relative z-0 w-full my-5  group">
            <input
              type="text"
              {...register(`alat.0.merk`)}
              name={`alat.0.merk`}
              id={`alat.0.merk`}
              className="block py-2.5 px-0 w-full md:w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor={`alat.0.merk`}
              className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Merk
            </label>
          </div>
        </div>

        <div className="border border-slate-600 rounded-lg p-2">
          <h3 className="md:text-xl font-bold text-white mb-2">
            HASIL KEGIATAN
          </h3>
          <div className="border border-slate-500 rounded-lg p-2 mb-2">
            {/* <h4 className="text-md">Kondisi Awal</h4> */}
            {kondisiawalFields.map((field, index) => {
              return (
                <div key={`kondisi-${field.id}`} className="flex mb-2">
                  <div className="relative z-0 w-full my-3  group">
                    <input
                      type="text"
                      {...register(`kondisiawal.${index}.desc`)}
                      name={`kondisiawal.${index}.desc`}
                      id={`kondisiawal.${index}.desc`}
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor={`kondisiawal.${index}.desc`}
                      className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {`Kondisi Awal-${index + 1}`}
                    </label>
                  </div>
                  {index >= 0 && (
                    <div className=" flex justify-center items-center">
                      <button
                        type="button"
                        className="h-fit text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 md:px-3 md:py-2 text-center flex justify-center items-center"
                        onClick={() => removeKondisiAwal(index)}
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/material-outlined/24/ffffff/filled-trash.png"
                          alt="filled-trash"
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
              onClick={() => appendKondisiAwal({ desc: "" })}
            >
              Tambahkan Kondisi Awal
            </button>
          </div>
          <div className="border border-slate-500 rounded-lg p-2">
            {/* <h4 className="text-md">Perbaikan</h4> */}
            {perbaikanFields.map((field, index) => {
              return (
                <div key={`perbaikan-${field.id}`} className="flex mb-3">
                  <div className="relative z-0 w-full my-3  group">
                    <input
                      type="text"
                      {...register(`perbaikan.${index}.desc`)}
                      name={`perbaikan.${index}.desc`}
                      id={`perbaikan.${index}.desc`}
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor={`perbaikan.${index}.desc`}
                      className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {`Perbaikan-${index + 1}`}
                    </label>
                  </div>
                  {index >= 0 && (
                    <div className=" flex justify-center items-center">
                      <button
                        type="button"
                        onClick={() => removePerbaikan(index)}
                        className="h-fit text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 md:px-3 md:py-2 text-center flex justify-center items-center"
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/material-outlined/24/ffffff/filled-trash.png"
                          alt="filled-trash"
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
              onClick={() => appendPerbaikan({ desc: "" })}
            >
              Tambahkan Perbaikan
            </button>
          </div>
        </div>

        <div className="border border-slate-600 rounded-lg p-2">
          <h3 className="text-xl font-bold text-white mb-3">Dokumentasi</h3>
          <Controller
            control={control}
            name="images"
            render={({ field: { onChange } }) => (
              <input
                type="file"
                className="text-white border w-full"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  handleFilesChange(files);
                  onChange(files);
                }}
              />
            )}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {filePreviews.map((preview, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setFilePreviews(filePreviews.filter((_, i) => i !== index));
                    removeImages(index);
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Form;
