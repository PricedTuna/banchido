import { useContext, useState } from "react";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import ActionInput from "../components/ActionInput";
import useTransfer from "../hooks/useTransfer";
import { transferDTO } from "../../../interfaces/DTOS/actions/transfer/transferDTO";
import withReactContent from "sweetalert2-react-content";
import { AuthContext, useCuentaInfo } from "../../../common/context/AuthContext";
import Swal from "sweetalert2";
import useDefaultsSwal from "../../../common/hooks/useDefaultsSwal";
import { getBasicUserInfoDTO } from "../../../interfaces/DTOS/actions/getBasicUserInfoDTO";
import { Cuenta } from "../../../interfaces/models/Cuenta";

export interface transferFormInterface {
  CuentaDestino: string;
  Cantidad: number;
}

function TransferenciaActPage() {
  const thisCuentaInfo = useCuentaInfo();
  
  const authContext = useContext(AuthContext);
  const { patchAccData } = authContext;
  const [ableToTransfer, setAbleToTransfer] = useState(false)
  const [userName, setUsernameToTransfer] = useState<string>("click en buscar...");
  const [formValues, setFormValues] = useState<transferFormInterface>({
    CuentaDestino: "",
    Cantidad: 0,
  });
  
  const {doingTransferSwal, transferSameAccError} = useDefaultsSwal();
  const [userAccount, setUserAccount] = useState<getBasicUserInfoDTO | null>(null);
  const {getuserByNumAcount, makeTransfer} = useTransfer();
  const mySwal = withReactContent(Swal);

  const handleOnChange =
    (fieldName: keyof transferFormInterface) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {

      if(fieldName == 'CuentaDestino'){
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
    const transferUserInfo = await getuserByNumAcount(formValues.CuentaDestino);

    if (transferUserInfo == undefined) {
      setUsernameToTransfer("Cuenta no encontrada");
    } else {
      setAbleToTransfer(true);
      setUserAccount(transferUserInfo);
      setUsernameToTransfer(
        `${transferUserInfo.user.Nombres} ${transferUserInfo.user.Apellido1} ${transferUserInfo.user.Apellido2}`
      );
    }
  };

  const handleTransfer = async () => {
    mySwal.fire({...doingTransferSwal,
      didOpen: () => {
        Swal.showLoading();
      },
      });

    if(thisCuentaInfo?._id === userAccount?.account._id){
      Swal.close()
      mySwal.fire(transferSameAccError);
      return;
    }

    const makeTransferData: transferDTO = {
      AccountOrigenId: (thisCuentaInfo ? thisCuentaInfo._id : ""),
      AccountDestinoiId: (userAccount?.account._id ? userAccount?.account._id : ""),
      Cantidad: formValues.Cantidad,
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

      if(thisCuentaInfo){

        const accData: Cuenta = {
          ...thisCuentaInfo,
         Saldo: thisCuentaInfo.Saldo - formValues.Cantidad,
        }

        patchAccData(accData);

      }
      mySwal.fire({
        title: "Transferencia realizada",
        icon: "success",
        timer: 4000
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
            inputNameValue="Cantidad"
            handleOnChange={handleOnChange}
          />
          <ActionInput
            inputType="text"
            inputTitle="Cuenta a transferir"
            inputNameValue="CuentaDestino"
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
