import { useState } from "react";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import ActionInput from "../components/ActionInput";
import useTransfer from "../hooks/useTransfer";
import { transferDTO } from "../../../interfaces/DTOS/actions/transfer/transferDTO";
import withReactContent from "sweetalert2-react-content";
import { useCuentaInfo } from "../../../common/context/AuthContext";
import Swal from "sweetalert2";

export interface transferFormInterface {
  cuentaDestino: string;
  cantidad: number;
}

function TransferenciaActPage() {
  const thisCuentaInfo = useCuentaInfo();
  
  const [ableToTransfer, setAbleToTransfer] = useState(false)
  const [userName, setUsernameToTransfer] = useState<string>("click en buscar...");
  const [formValues, setFormValues] = useState<transferFormInterface>({
    cuentaDestino: "",
    cantidad: 0,
  });
  
  const {getuserByNumAcount, makeTransfer, getAcountByNumAcount} = useTransfer();
  const mySwal = withReactContent(Swal);

  const handleOnChange =
    (fieldName: keyof transferFormInterface) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {

      if(fieldName == 'cuentaDestino'){
        setAbleToTransfer(false);
        setUsernameToTransfer("...");
      }
      
      let value = changeEvent.currentTarget.value;
      if (!/^\d*$/.test(value)) {
        changeEvent.target.value = value.replace(/\D/g, '');
      }

      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  const handleClickSearch = async () => {
    const transferUserInfo = await getuserByNumAcount(formValues.cuentaDestino);

    if (transferUserInfo == undefined) {
      setUsernameToTransfer("Cuenta no encontrada");
    } else {
      setAbleToTransfer(true);
      setUsernameToTransfer(
        `${transferUserInfo.nombres} ${transferUserInfo.apellido1} ${transferUserInfo.apellido2}`
      );
    }
  };

  const handleTransfer = async () => {
    mySwal.fire({ // transferSwal
      title: "Iniciando sesión...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const transferCuentaInfo = await getAcountByNumAcount(formValues.cuentaDestino);

    const makeTransferData: transferDTO = {
      CuentaOrigenId: (thisCuentaInfo ? thisCuentaInfo.id : 0),
      CuentaDestinoId: (transferCuentaInfo ? transferCuentaInfo.id : 0),
      Cantidad: formValues.cantidad,
    };

    const transferCodeResult = await makeTransfer(makeTransferData);
    mySwal.close();

    if(transferCodeResult == undefined && transferCodeResult !== 200){
      mySwal.fire({
        title: "Ocurrió un error",
        text: "La transferencia no se pudo realizar, verifica los datos e intentalo en unos minutos",
        icon: "error"
      })
    } else {
      mySwal.fire({
        title: "Transferencia realizada",
        icon: "success",
        timer: 5000
      })
    }
  };

  return (
    <ActionsPageWrapper>
      <h1>Transferencia</h1>
      <div>
        <div style={{minWidth: "3rem"}} className="d-flex flex-column mb-4">
          <ActionInput
            inputType="text"
            inputTitle="Cantidad a transferir"
            inputNameValue="cantidad"
            handleOnChange={handleOnChange}
          />
          <ActionInput
            inputType="text"
            inputTitle="Cuenta a transferir"
            inputNameValue="cuentaDestino"
            handleOnChange={handleOnChange}
          />
          <button className="btn btn-primary" onClick={handleClickSearch}>
            Buscar
          </button>
          <p className="text-center">
            cuenta destino: {userName}
          </p>
        </div>
        <div className="d-flex flex-column">
          <button disabled={!ableToTransfer} className="btn btn-primary" onClick={() => handleTransfer()}>
            Transferir
          </button>
        </div>
      </div>
    </ActionsPageWrapper>
  );
}

export default TransferenciaActPage;
