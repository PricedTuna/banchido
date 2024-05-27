import { useEffect, useState } from "react";
import HistorialItem from "./components/HistorialItem"
import useHistorial from "./useHistorial"

export interface movimientos {
  retiros: []
  transfOrigen: []
  transDest: []
}

function HistorialPage() {
  const { transferOrigen, transferDestino, retiros } = useHistorial();


  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center gap-2" style={{minHeight: 'calc(100vh - 100px)'}}>
      <div className="mt-4">
        <h1>Historial</h1>
      </div>
      <div className="container text-center mt-3">
        {
          retiros.map(() => (
            <HistorialItem concepto="Retiro" fecha={new Date()} />
          ))
        }
      </div>
    </div>
  )
}

export default HistorialPage
