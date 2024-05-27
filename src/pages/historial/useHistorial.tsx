import { useEffect, useState } from "react";
import { useAuthToken, useCuentaInfo } from "../../common/context/AuthContext";
import { axiosApi } from "../../config/api/axiosConfig";

function useHistorial() {
  const thisCuentaInfo = useCuentaInfo();
  const authToken = useAuthToken();

  const [historial, setHistorial] = useState({
    transferOrigen: [],
    transferDestino: [],
    retiros: [],
  });

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const transferOrigenPromise = axiosApi.get(
          "transfer/acc-origin/" + thisCuentaInfo?._id,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const transferDestinoPromise = axiosApi.get(
          "transfer/acc-destination/" + thisCuentaInfo?._id,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const retirosPromise = axiosApi.get(
          "retiro/account/" + thisCuentaInfo?._id,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const [transferOrigenResponse, transferDestinoResponse, retirosResponse] = await Promise.all([
          transferOrigenPromise,
          transferDestinoPromise,
          retirosPromise,
        ]);

        setHistorial({
          transferOrigen: transferOrigenResponse.data || [],
          transferDestino: transferDestinoResponse.data || [],
          retiros: retirosResponse.data || [],
        });
      } catch (error) {
        console.error("Error fetching historial data:", error);
        // Manejo de errores si alguna de las peticiones falla
        setHistorial({
          transferOrigen: [],
          transferDestino: [],
          retiros: [],
        });
      }
    };

    if (thisCuentaInfo?._id && authToken) {
      fetchHistorial();
    }
  }, [thisCuentaInfo, authToken]);

  return historial;
}

export default useHistorial;
