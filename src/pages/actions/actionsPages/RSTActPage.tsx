import { useState } from "react";
import { useCuentaInfo } from "../../../common/context/AuthContext";
import useNotAutorized from "../../../common/hooks/useNotAutorized";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import { rstForm } from "../../../interfaces/DTOS/actions/rst/rstForm";
import RSTInput from "../components/RSTInput";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useRST from "../hooks/useRST";
import useDefaultsSwal from "../../../common/hooks/useDefaultsSwal";

function RSTActPage() {

  const {noCantidadError} = useDefaultsSwal()
  const thisCuentaInfo = useCuentaInfo();
  const sendToLoginLogout = useNotAutorized();
  const generateToken = useRST();
  const [rstForm, setRstForm] = useState<rstForm>({
    AccountId: "",
    Cantidad: 0,
  });
  const [token, setToken] = useState("...");
  const mySwal = withReactContent(Swal);

  const handleGenerateToken = async () => {
    if (thisCuentaInfo === undefined) {
      sendToLoginLogout();
    } else {

      if(thisCuentaInfo.Saldo == 0 || rstForm.Cantidad == 0){
        mySwal.fire(noCantidadError)
        return;
      }
      
      if(thisCuentaInfo.Saldo < rstForm.Cantidad){
        mySwal.fire({
          title: "Cantidad excesiva",
          text: "No puedes retirar una cantidad mayor a tu saldo en cuenta",
          icon: "error"
        })
        return;
      }

      
      const tokenGenerated = await generateToken({...rstForm, AccountId: thisCuentaInfo._id});

      if(tokenGenerated == undefined){
        mySwal.fire({
          title: "Ocurrió un error",
          text: "No se pudo generar el token, verifica los datos e intentalo de nuevo en unos minutos",
          icon: "error"
        })
      } else {
        setToken(tokenGenerated.Token);
        mySwal.fire({
          title: "Token generado",
          icon: "success",
          timer: 2000
        })
      }
    }
  };

  const handleOnChange =
    (fieldName: keyof rstForm) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {

      if(fieldName === "Cantidad"){
        let value = changeEvent.currentTarget.value;
        if (!/^\d*$/.test(value)) {
          changeEvent.target.value = value.replace(/\D/g, '');
        }
      }

      setRstForm({ ...rstForm, [fieldName]: changeEvent.target.value });
    };

  return (
    <ActionsPageWrapper>
      <h1>Retiro sin tarjeta</h1>
      <div>
        <div className="d-flex flex-column gap-2 mb-4">
          <p>
            Este codigo puede ser introducido para retirar sin necesidad de
            tener tarjeta física
          </p>
          {token !== "..." && <p className="text-center fs-5">Token: {token}</p>}
          <RSTInput
            handleOnChange={handleOnChange}
            inputNameValue="Cantidad"
            inputTitle={`Cantidad a retirar (maximo ${thisCuentaInfo?.Saldo})`}
            inputType="number"
          />
          <button className="btn btn-primary" onClick={handleGenerateToken}>
            Generar token
          </button>
        </div>
      </div>
    </ActionsPageWrapper>
  );
}

export default RSTActPage;
