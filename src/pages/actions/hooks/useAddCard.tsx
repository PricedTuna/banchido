import { addCardForm } from '../../../interfaces/DTOS/actions/addCard/addCardForm'
import { axiosApi } from '../../../config/api/axiosConfig'
import { addCardToken } from '../../../interfaces/DTOS/actions/addCard/addCardToken';

function useAddCard() {
  
  const generateToken = async(formValues: addCardForm): Promise<addCardToken | undefined>  => {

    const tokenGenerated = await axiosApi
      .post('/rfidtoken', formValues)
      .then((response) => response.data)
      .catch(() => undefined);

    return tokenGenerated;
  }

  return generateToken;

}

export default useAddCard
