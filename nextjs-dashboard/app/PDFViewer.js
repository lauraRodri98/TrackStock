import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file="/pdfs/Informe-1.pdf"
        onLoadSuccess={onLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div>
        <p>
          Página {pageNumber} de {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Anterior
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
