interface Props {
  concepto: string,
  isIngreso: boolean,
  cantidad: number,
  fecha?: Date,
  aditionalInfo?: string,
}

function HistorialItem({concepto, cantidad, isIngreso, aditionalInfo = ""}: Props) {

  // const formatDate = () => {
  //   const day = String(fecha.getDate()).padStart(2, '0');
  //   const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
  //   const year = fecha.getFullYear();

  //   // Formatear la fecha en dd/mm/yyyy
  //   const formattedDate = `${day}/${month}/${year}`;
  //   return formattedDate;
  // }

  return (
    <div className="row">
      <div className="col-4 text-end d-flex align-items-center justify-content-end">
        <p className={`fs-5 ${isIngreso ? "text-success" : "text-danger"}`}>{cantidad}</p>
      </div>
      <div className="col d-flex align-items-center justify-content-center">
        <p className="fs-5">{concepto}</p>
        <p>{aditionalInfo}</p>
      </div>
    </div>
  )
}

export default HistorialItem
