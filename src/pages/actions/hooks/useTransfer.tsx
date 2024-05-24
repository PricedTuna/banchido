import { axiosApi } from "../../../config/api/axiosConfig";
import { getBasicUserInfoDTO } from "../../../interfaces/DTOS/actions/getBasicUserInfoDTO";
import { transferDTO } from "../../../interfaces/DTOS/actions/transfer/transferDTO";
import { basicAcountInfoDTO } from "../../../interfaces/DTOS/auth/basicAcountInfoDTO";

function useTransfer() {
  const makeTransfer = async (
    transferData: transferDTO
  ) => {
    const transferResponseCode = await axiosApi
      .post("/Cuenta/transfer", transferData)
      .then((response) => response.status)
      .catch(() => undefined);

    return transferResponseCode;
  };

  const getuserByNumAcount = async (
    numeroCuenta: string
  ): Promise<getBasicUserInfoDTO | undefined> => {
    const basicUserInfo = await axiosApi
      .get<getBasicUserInfoDTO>("/account/account-by-num", {
        params: { accountNum: numeroCuenta },
      })
      .then((response) => response.data)
      .catch(() => undefined);

    console.log(basicUserInfo);
    return basicUserInfo;
  };

  const getAcountByNumAcount = async (numeroCuenta: string): Promise<basicAcountInfoDTO | undefined> => {
    const basicAcountInfo = await axiosApi
      .get<basicAcountInfoDTO>("/Cuenta/acountbynum", {
        params: { NumeroCuenta: numeroCuenta },
      })
      .then((response) => response.data)
      .catch(() => undefined);

    console.log(basicAcountInfo);
    return basicAcountInfo;
  }

  return {getuserByNumAcount, makeTransfer, getAcountByNumAcount};
}

export default useTransfer;
