import { useContext, useState } from "react";
import { EditProfileForm } from "../../../interfaces/DTOS/actions/editProfile/EditProfileForm";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import EditProfileInput from "../components/EditProfileInput";
import { EditProfileErrors } from "../../../interfaces/DTOS/actions/editProfile/EditProfileErrors";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useNotAutorized from "../../../common/hooks/useNotAutorized";
import { AuthContext, useUserInfo } from "../../../common/context/AuthContext";
import useFormValidator from "../../../common/hooks/useFormValidator";
import useDefaultsSwal from "../../../common/hooks/useDefaultsSwal";
import useEditProfile from "../hooks/useEditProfile";
import { User } from "../../../interfaces/DTOS/auth/login/new/AuthJWTInterface";

function EditarPerfilActPage() {
  const mySwal = withReactContent(Swal);
  const notAutorized = useNotAutorized();
  const userInfo = useUserInfo();
  if (!userInfo) notAutorized();
  const { validateEmail } = useFormValidator();
  const {wrongEmailSwal} = useDefaultsSwal();
  const editProfile = useEditProfile();
  const authContext = useContext(AuthContext);
  const { patchUserData } = authContext;
  const sendToLoginLogout = useNotAutorized();

  const [formValues, setFormValues] = useState<EditProfileForm>({
    UserId: "",
    Correo: userInfo ? userInfo.Correo : "",
  });

  const [formErrors, setFormErrors] = useState<EditProfileErrors>({
    correo: false,
  });

  const validateEditForm = (): boolean => {
    if (formValues.Correo == "") {
      mySwal.fire({
        title: "No puede haber ningún campo vacío",
        icon: "error",
      });

      if (formValues.Correo == "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          correo: true, // Marca el campo como con error
        }));
      }

      return false;
    }

    if (!validateEmail(formValues.Correo)) {
      mySwal.fire(wrongEmailSwal);

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        correo: true, // Marca el campo como con error
      }));

      return false;
    }    

    return true;
  };

  const handleEditProfile = async () => {
    if (!validateEditForm()) return;

    mySwal.fire({
      // EditingSwal
      title: "Editando perfil...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if(userInfo){
      const editedProfile = await editProfile({...formValues, UserId: userInfo._id});

      if (editedProfile){
        const userData: User = {
          ...userInfo,
          __v: 0,
          Correo: editedProfile.Correo
        }
        mySwal.close();
        patchUserData(userData);
        sendToLoginLogout();
        mySwal.fire({
          title: "Actualización realizada",
          icon: "success",
          timer: 4000
        })
      }



    }
  };

  const handleOnChange =
    (fieldName: keyof EditProfileForm) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <ActionsPageWrapper>
      <h1>Editar perfil</h1>
      <div
        style={{ minWidth: "3rem", maxWidth: "28rem" }}
        className="d-flex flex-column mb-4"
      >
        <div>
          <EditProfileInput
            inputNameValue="Correo"
            inputTitle="nuevo correo electronico"
            handleOnChange={handleOnChange}
            inputType="email"
            leftAddonIcon="bi bi-envelope"
            isError={formErrors.correo}
            value={formValues.Correo}
          />
        </div>

        <div>
          <p>
            Si necesitas cambiar tu "password" acercate a un empleado de
            banchido
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleEditProfile()}>
          Editar
        </button>
      </div>
    </ActionsPageWrapper>
  );
}

export default EditarPerfilActPage;
