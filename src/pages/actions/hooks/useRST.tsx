import { rstForm } from '../../../interfaces/DTOS/actions/rst/rstForm';
import { rstToken } from '../../../interfaces/DTOS/actions/rst/rstToken';
import { axiosApi } from '../../../config/api/axiosConfig';

function useRST() {
  const generateToken = async (
    formValues: rstForm
  ): Promise<rstToken | undefined> => {
    const tokenGenerated = await axiosApi
      .post<rstToken>("/rst", formValues)
      .then((response) => response.data)
      .catch(() => undefined);

    console.log(tokenGenerated);
    return tokenGenerated;
  };
  
  return generateToken;
}

export default useRST
