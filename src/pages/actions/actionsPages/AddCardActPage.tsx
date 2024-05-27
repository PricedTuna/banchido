import { useState } from "react";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCuentaInfo } from "../../../common/context/AuthContext";
import useNotAutorized from "../../../common/hooks/useNotAutorized";
import useAddCard from "../hooks/useAddCard";
import useDefaultsSwal from "../../../common/hooks/useDefaultsSwal";

function AddCardActPage() {
  const [token, setToken] = useState("");
  const thisCuentaInfo = useCuentaInfo();
  const sendToLoginLogout = useNotAutorized();
  const { tokenGenericError } = useDefaultsSwal();
  const generateToken = useAddCard();
  const mySwal = withReactContent(Swal);

  const handleGenerateToken = async () => {
    if (thisCuentaInfo === undefined) {
      sendToLoginLogout();
    } else {
      const tokenGenerated = await generateToken({
        AccountId: thisCuentaInfo._id,
      });

      if (!tokenGenerated) {
        mySwal.fire(tokenGenericError);
      } else {
        setToken(tokenGenerated.Token);
        mySwal.fire({
          title: "Token generado",
          icon: "success",
          timer: 2000,
        });
      }
    }
  };

  return (
    <ActionsPageWrapper>
      <h1>Agregado de tarjeta</h1>
      <div>
        <div style={{minWidth: "3rem", maxWidth: "28rem"}} className="d-flex flex-column mb-4">
          <p>
            Este token debe ser introducido en el cajero banchido mas cercano
            para registrar una tarjeta fisica a tu cuenta acutál
          </p>
          {token !== "" && (
            <p className="text-center fs-5">Token: {token}</p>
          )}
          <button className="btn btn-primary" onClick={handleGenerateToken}>
            Generar token
          </button>
        </div>
      </div>
    </ActionsPageWrapper>
  );
}

export default AddCardActPage;
