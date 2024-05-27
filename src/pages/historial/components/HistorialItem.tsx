interface Props {
  concepto: string,
  isIngreso: boolean,
  fecha: Date,
}

function HistorialItem({concepto, isIngreso, fecha = new Date()}: Props) {

  const formatDate = () => {
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const year = fecha.getFullYear();

    // Formatear la fecha en dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return (
    <div className="row">
      <div className="col-4 text-end">
        <p>Concepto: {concepto}owo</p>
        <p className={`fs-2 ${isIngreso ? "text-success" : "text-danger"}`}>+ 30</p>
      </div>
      <div className="col">
        <p className="fs-2">{formatDate()}</p>
      </div>
    </div>
  )
}

export default HistorialItem
