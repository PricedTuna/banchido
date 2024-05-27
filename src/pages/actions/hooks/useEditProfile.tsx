import { useAuthToken } from "../../../common/context/AuthContext";
import { axiosApi } from "../../../config/api/axiosConfig";
import { EditProfileForm } from "../../../interfaces/DTOS/actions/editProfile/EditProfileForm";
import { User } from "../../../interfaces/DTOS/auth/login/new/AuthJWTInterface";

function useEditProfile() {
  const authToken = useAuthToken();

  const editProfile = async (editProfileForm: EditProfileForm): Promise<User | undefined> => {
    const profileEdited = await axiosApi
      .patch("/users", editProfileForm, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => response.data)
      .catch(() => undefined);

    return profileEdited;
  };

  return editProfile;
}

export default useEditProfile;
