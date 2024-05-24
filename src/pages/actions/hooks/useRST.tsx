import { rstForm } from '../../../interfaces/DTOS/actions/rst/rstForm';
import { rstToken } from '../../../interfaces/DTOS/actions/rst/rstToken';
import { axiosApi } from '../../../config/api/axiosConfig';
import { useAuthToken } from '../../../common/context/AuthContext';

function useRST() {
  const authToken = useAuthToken()

  const generateToken = async (
    formValues: rstForm
  ): Promise<rstToken | undefined> => {

    const tokenGenerated = await axiosApi
      .post<rstToken>("/rst", formValues, {headers: { Authorization: `Bearer ${authToken}` }})
      .then((response) => response.data)
      .catch(() => undefined);

    return tokenGenerated;
  };
  
  return generateToken;
}

export default useRST
