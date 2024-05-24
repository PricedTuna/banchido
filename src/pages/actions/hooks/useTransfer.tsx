import { axiosApi } from "../../../config/api/axiosConfig";
import { getBasicUserInfoDTO } from "../../../interfaces/DTOS/actions/getBasicUserInfoDTO";
import { transferDTO } from "../../../interfaces/DTOS/actions/transfer/transferDTO";

function useTransfer() {
  const makeTransfer = async (
    transferData: transferDTO
  ) => {
    const transferResponseCode = await axiosApi
      .post("/transfer", transferData)
      .then((response) => response.status)
      .catch(() => undefined);

    return transferResponseCode;
  };

  const getuserByNumAcount = async (
    numeroCuenta: string
  ): Promise<getBasicUserInfoDTO | undefined> => {
    const basicUserInfo = await axiosApi
      .get<getBasicUserInfoDTO>(`/accounts/account-user/${numeroCuenta}`)
      .then((response) => response.data)
      .catch(() => undefined);

    return basicUserInfo;
  };

  return {getuserByNumAcount, makeTransfer};
}

export default useTransfer;
