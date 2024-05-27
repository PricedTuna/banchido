import HistorialItem from "./components/HistorialItem";
import useHistorial from "./useHistorial";

export interface MovimientosInterface {
  retiros: RetiroInterface[];
  transfOrigen: TransferInterface[];
  transDest: TransferInterface[];
}

export interface RetiroInterface {
  AccountId: string;
  Cantidad: number;
}

export interface TransferInterface {
  AccountDestinoiId: string;
  AccountOrigenId: string;
  Cantidad: number;
}

function HistorialPage() {
  const { transDest, transfOrigen, retiros } = useHistorial();

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center gap-2"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <div className="mt-4">
        <h1>Historial</h1>
      </div>
      <div className="container text-center mt-3">
        <div className="my-3 py-3">
          <h4 className="fs-3">Transferencias Recibidas</h4>
          {transDest.length > 0 ? (
            transDest.map((transfer) => (
              <HistorialItem
                concepto="transferencia recibida"
                cantidad={transfer.Cantidad}
                isIngreso
              />
            ))
          ) : (
            <p className="fs-4">Aún no hay transferencias</p>
          )}
        </div>
        <div className="my-3 py-3">
          <h4 className="fs-3">Transferencias Enviadas</h4>
          {transfOrigen.length > 0 ? (
            transfOrigen.map((transfer) => (
              <HistorialItem
                concepto="transferencia enviada"
                cantidad={transfer.Cantidad}
                isIngreso
              />
            ))
          ) : (
            <p className="fs-4">Aún no hay transferencias</p>
          )}
        </div>
        <div className="my-3 py-3">
          <h4 className="fs-3">Retiros</h4>
          {retiros.length > 0 ? (
            retiros.map((retiro) => (
              <HistorialItem
                concepto="Retiro"
                cantidad={retiro.Cantidad}
                isIngreso
              />
            ))
          ) : (
            <p className="fs-4">Aún no hay retiros</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistorialPage;
