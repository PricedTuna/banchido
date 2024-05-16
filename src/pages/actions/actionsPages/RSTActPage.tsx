import { useState } from "react";
import { useCuentaInfo } from "../../../context/AuthContext";
import useNotAutorized from "../../../hooks/useNotAutorized";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import { rstForm } from "../../../interfaces/DTOS/actions/rst/rstForm";
import RSTInput from "../components/RSTInput";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useRST from "../hooks/useRST";

function RSTActPage() {
  const thisCuentaInfo = useCuentaInfo();
  const sendToLoginLogout = useNotAutorized();
  const generateToken = useRST();
  const [rstForm, setRstForm] = useState<rstForm>({
    CuentaOrigenId: 0,
    Cantidad: 0,
  });
  const [token, setToken] = useState("...");
  const mySwal = withReactContent(Swal);

  const handleGenerateToken = async () => {
    if (thisCuentaInfo === undefined) {
      sendToLoginLogout();
    } else {
      
      if(thisCuentaInfo.saldo < rstForm.Cantidad){
        mySwal.fire({
          title: "Cantidad excesiva",
          text: "No puedes retirar una cantidad mayor a tu saldo en cuenta",
          icon: "error"
        })
        return;
      }

      setRstForm({...rstForm, CuentaOrigenId: thisCuentaInfo.id});
      const tokenGenerated = await generateToken(rstForm);

      if(tokenGenerated == undefined){
        mySwal.fire({
          title: "Ocurrió un error",
          text: "No se pudo generar el token, verifica los datos e intentalo de nuevo en unos minutos",
          icon: "error"
        })
      } else {
        setToken(tokenGenerated.token);
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
          <RSTInput
            handleOnChange={handleOnChange}
            inputNameValue="Cantidad"
            inputTitle={`Cantidad a retirar (maximo ${thisCuentaInfo?.saldo})`}
            inputType="number"
          />
          <p className="text-center fs-5">Token: {token}</p>
          <button className="btn btn-primary" onClick={handleGenerateToken}>
            Generar token
          </button>
        </div>
      </div>
    </ActionsPageWrapper>
  );
}

export default RSTActPage;
