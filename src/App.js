import { BrowserRouter, Route, Routes } from "react-router-dom";
import PdfCard from "./pdf/PdfCard";
import Form from "./components/Form";
import PdfPreview from "./components/PdfPreview";

const Main = () => {
  const cards = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gap: "1rem",
    padding: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>List of invoices</h2>
      <div style={cards}>
        <PdfCard title="Oasic ltd Invoice" />
        <PdfCard title="Libra ltd Invoice" />
        <PdfCard title="Xpress ltd Invoice" />
        <PdfCard title="Cardic ltd Invoice" />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* <Route path="/" exact element={<Main />} /> */}
        <Route path="/" element={<Form />} />
        <Route path="/view-pdf" element={<PdfPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
