import React from "react";

export default function MiniLoading() {
  return (
    <div className="d-flex justify-content-center p-3">
      <div className="spinner-border" role="status">
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
}
