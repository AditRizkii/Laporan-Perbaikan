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
    <div className="relative w-full h-full py-28 justify-center items-center bg-gray-900">
      <div className="relative z-10 max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
        <h3 className="text-cyan-400 font-semibold">Formulir</h3>
        <p className="text-white text-2xl font-semibold sm:text-4xl">
          Laporan Kegiatan Perbaikan Peralatan
        </p>
        <p className="text-gray-300">
          Lengkapi Form untuk Mengajukan Perbaikan Peralatan Anda.
          <span className="text-red-500">(iya kah dit)</span>
        </p>
      </div>
      <div className="relative z-10 mt-12 mx-auto px-4 p-8 bg-slate-100 sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:px-8 sm:rounded-xl shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="border-2 border-slate-300 bg-white rounded-lg px-6 py-5">
            <h3 className=" md:text-xl font-bold text-gray-800 py-3">
              PEGAWAI YANG MELAKSANAKAN TUGAS
            </h3>
            {pelaksanaFields.map((field, index) => {
              return (
                <div
                  key={`div-${field.id}`}
                  className="transition flex flex-col md:flex-row mb-2 border-2 border-slate-200 p-2 md:pl-4 rounded-md shadow-sm"
                >
                  <div className="w-full md:w-2/3">
                    <div className="relative z-0 w-full my-5  group">
                      <input
                        type="text"
                        {...register(`pelaksana.${index}.nama`)}
                        name={`pelaksana.${index}.nama`}
                        id={`pelaksana.${index}.nama`}
                        className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor={`pelaksana.${index}.nama`}
                        className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        pattern="\d{18}"
                        required
                      />
                      <label
                        htmlFor={`pelaksana.${index}.nip`}
                        className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        NIP
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="underline_select"
                        className="sr-only text-gray-500"
                      >
                        Pangkat/Golongan
                      </label>
                      <select
                        id="underline_select"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        {...register(`pelaksana.${index}.pangkat`)}
                        required
                      >
                        <option selected value="">
                          Pangkat/Golongan
                        </option>
                        <optgroup
                          label="Golongan II (pengatur)"
                          className="text-gray-800 font-semibold"
                        >
                          <option
                            className="text-gray-600"
                            value="Pengatur Muda/II-a"
                          >
                            Pengatur Muda/II-a
                          </option>
                          <option
                            className="text-gray-600"
                            value="Pengatur Muda TK.1/II-b"
                          >
                            Pengatur Muda TK.1/II-b
                          </option>
                          <option
                            className="text-gray-600"
                            value="Pengatur/II-c"
                          >
                            Pengatur/II-c
                          </option>
                          <option
                            className="text-gray-600"
                            value="Pengatur TK.1/II-d"
                          >
                            Pengatur TK.1/II-d
                          </option>
                        </optgroup>

                        <optgroup
                          label="Golongan III (penata)"
                          className="text-black font-semibold"
                        >
                          <option
                            className="text-gray-600"
                            value="Penata Muda/III-a"
                          >
                            Penata Muda/III-a
                          </option>
                          <option
                            className="text-gray-600"
                            value="Penata Muda TK.1/III-b"
                          >
                            Penata Muda TK.1/III-b
                          </option>
                          <option
                            className="text-gray-600"
                            value="Penata/III-c"
                          >
                            Penata/III-c
                          </option>
                          <option
                            className="text-gray-600"
                            value="Penata TK.1/III-d"
                          >
                            Penata TK.1/III-d
                          </option>
                        </optgroup>

                        <optgroup
                          label="Golongan IV (pembina)"
                          className="text-black font-semibold"
                        >
                          <option
                            className="text-gray-600"
                            value="Pembina Muda/IV-a"
                          >
                            Pembina Muda/IV-a
                          </option>
                          <option
                            className="text-gray-600"
                            value="Pembina Muda TK.1/IV-b"
                          >
                            Pembina Muda TK.1/IV-b
                          </option>
                          <option
                            className="text-gray-600"
                            value="Pembina/IV-c"
                          >
                            Pembina/IV-c
                          </option>
                          <option
                            className="text-gray-600"
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor={`pelaksana.${index}.jabatan`}
                        className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Jabatan
                      </label>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 h-[100] mb-3 md:mb-0 flex flex-col gap-y-3 justify-center items-center">
                    <div>
                      <p className="flex justify-center items-center bg-blue-100 text-blue-800 font-semibold text-sm me-2 px-2.5 py-0.5 rounded">{`Pelaksana-${
                        index + 1
                      }`}</p>
                    </div>
                    {index >= 0 && (
                      <div className="w-full md:w-1/3 flex justify-center items-center">
                        <button
                          // className="h-fit text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs px-5 py-2.5 text-center me-2 mb-2"
                          className="h-fit text-red-500 bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-bold rounded-full text-xs px-4 py-1.5 text-center me-2 mb-2"
                          type="button"
                          onClick={() => removePelaksana(index)}
                        >
                          HAPUS
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
              onClick={() =>
                appendPelaksana({ nama: "", nip: "", pangkat: "", jabatan: "" })
              }
            >
              Tambahkan Pelaksana
            </button>
          </div>
          <div className="border-2 border-slate-300 bg-white rounded-lg px-6 py-5">
            <h3 className="md:text-xl font-bold text-gray-800 py-3">
              TUJUAN DAN JADWAL KEGIATAN
            </h3>
            <div>
              <div className="relative z-0 w-full my-5 group">
                <input
                  type="text"
                  {...register(`kegiatan.0.tempatTujuan`)}
                  name={`kegiatan.0.tempatTujuan`}
                  id={`kegiatan.0.tempatTujuan`}
                  className="block py-2.5 px-0 w-full md:w-1/2 lg:w-2/3 text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`kegiatan.0.tempatTujuan`}
                  className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className=" w-full md:w-1/2 lg:w-2/3"
                >
                  <label htmlFor="" className="text-gray-500">
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

                <p className="flex items-end justify-start md:justify-end md:p-2 text-blue-800 font-semibold">
                  {formattedDate}
                </p>
              </div>
              <div className="relative z-0 w-full my-5 group">
                <input
                  type="text"
                  {...register(`kegiatan.0.tujuan`)}
                  name={`kegiatan.0.tujuan`}
                  id={`kegiatan.0.tujuan`}
                  className="block py-2.5 px-0 w-full md:w-1/2 lg:w-2/3 text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor={`kegiatan.0.tujuan`}
                  className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tujuan
                </label>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-300 bg-white rounded-lg px-6 py-5">
            <h3 className="md:text-xl font-bold text-gray-800 py-3">
              SPESIFIKASI ALAT
            </h3>
            <div className="relative z-0 w-full my-5  group">
              <input
                type="text"
                {...register(`alat.0.nama`)}
                name={`alat.0.nama`}
                id={`alat.0.nama`}
                className="block py-2.5 px-0 w-full md:w-1/2 lg:w-2/3 text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={`alat.0.nama`}
                className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="block py-2.5 px-0 w-full md:w-1/2 lg:w-2/3 text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={`alat.0.merk`}
                className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Merk
              </label>
            </div>
          </div>

          <div className="border-2 border-slate-300 bg-white rounded-lg px-6 py-5">
            <h3 className="md:text-xl font-bold text-gray-800 py-3">
              HASIL KEGIATAN
            </h3>
            <div className="border border-slate-200 p-2 md:px-4 rounded-lg mb-2">
              {/* <h4 className="text-md">Kondisi Awal</h4> */}
              {kondisiawalFields.map((field, index) => {
                return (
                  <div
                    key={`kondisi-${field.id}`}
                    className="flex justify-between mb-4"
                  >
                    <div className="relative z-0 flex w-full lg:w-10/12 my-3 group">
                      <textarea
                        {...register(`kondisiawal.${index}.desc`)}
                        name={`kondisiawal.${index}.desc`}
                        id={`kondisiawal.${index}.desc`}
                        rows="2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor={`kondisiawal.${index}.desc`}
                        className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {`Kondisi Awal-${index + 1}`}
                      </label>
                    </div>
                    {index >= 0 && (
                      <div className=" flex justify-center items-center">
                        <button
                          type="button"
                          className="h-fit text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 md:px-3 md:py-2 text-center flex justify-center items-center"
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
                className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
                onClick={() => appendKondisiAwal({ desc: "" })}
              >
                Tambahkan Kondisi Awal
              </button>
            </div>
            <div className="border border-slate-200 p-2 md:px-4  rounded-lg mb-2">
              {/* <h4 className="text-md">Perbaikan</h4> */}
              {perbaikanFields.map((field, index) => {
                return (
                  <div
                    key={`perbaikan-${field.id}`}
                    className="flex justify-between mb-4"
                  >
                    <div className="relative z-0 flex w-full lg:w-10/12 my-3 group">
                      <textarea
                        {...register(`perbaikan.${index}.desc`)}
                        name={`perbaikan.${index}.desc`}
                        id={`perbaikan.${index}.desc`}
                        rows="2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor={`perbaikan.${index}.desc`}
                        className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {`Perbaikan-${index + 1}`}
                      </label>
                    </div>
                    {index >= 0 && (
                      <div className=" flex justify-center items-center">
                        <button
                          type="button"
                          onClick={() => removePerbaikan(index)}
                          className="h-fit text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 md:px-3 md:py-2 text-center flex justify-center items-center"
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
                className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
                onClick={() => appendPerbaikan({ desc: "" })}
              >
                Tambahkan Perbaikan
              </button>
            </div>
          </div>

          <div className="border-2 border-slate-300 bg-white rounded-lg px-6 py-5">
            <h3 className="text-xl font-bold text-gray-800 mb-3 py-3">
              Dokumentasi
            </h3>
            <Controller
              control={control}
              name="images"
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  className="text-gray-400 font-medium border w-full"
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
                      setFilePreviews(
                        filePreviews.filter((_, i) => i !== index)
                      );
                      removeImages(index);
                    }}
                    className="absolute -top-1 -right-2 bg-red-600 text-white border-none rounded-full w-6 h-5 cursor-pointer flex items-center justify-center text-center text-sm"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150 uppercase"
          >
            submit
          </button>
        </form>
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

export default Form;
