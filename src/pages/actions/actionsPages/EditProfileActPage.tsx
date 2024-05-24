import { useState } from "react";
import { EditProfileForm } from "../../../interfaces/DTOS/actions/editProfile/EditProfileForm";
import ActionsPageWrapper from "../components/ActionsPageWrapper";
import EditProfileInput from "../components/EditProfileInput";
import { EditProfileErrors } from "../../../interfaces/DTOS/actions/editProfile/EditProfileErrors";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useNotAutorized from "../../../common/hooks/useNotAutorized";
import { useUserInfo } from "../../../common/context/AuthContext";

function EditarPerfilActPage() {

  const mySwal = withReactContent(Swal);
  const notAutorized = useNotAutorized();
  const userInfo = useUserInfo();
  if(!userInfo)
    notAutorized();

  const [formValues, setFormValues] = useState<EditProfileForm>({
    correo: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<EditProfileErrors>({
    correo: false,
    password: false,
  });

  const validateEditForm = (): boolean => {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formValues.correo == "" || formValues.password == "") {
      mySwal.fire({
        title: "No puede haber ningún campo vacío",
        icon: "error",
      });

      if(formValues.correo == ""){
        setFormErrors({ ...formErrors, correo: true, password: false });
      }

      if(formValues.password == ""){
        setFormErrors({ ...formErrors, password: true });
      }
      
      return false;
    }

    if (!emailPattern.test(formValues.correo)) {
      mySwal.fire({
        title: "Verifica la sintaxys de tu correo",
        icon: "error",
      });
      setFormErrors({ ...formErrors, correo: true, password: false });
      return false;
    }

    return true;
  };

  const handleEditProfile = () => {

    if(validateEditForm()) return;

    mySwal.fire({ // EditingSwal
      title: "Editando perfil...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const handleOnChange =
    (fieldName: keyof EditProfileForm) =>
    (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [fieldName]: changeEvent.target.value });
    };

  return (
    <ActionsPageWrapper>
      <h1>Editar perfil</h1>
      <div className="container">
        <div className="d-flex flex-column mb-4">
          <div>
            <EditProfileInput
              inputNameValue="correo"
              inputTitle="Correo electronico"
              handleOnChange={handleOnChange}
              inputType="email"
              leftAddonIcon="bi bi-envelope"
              isError={formErrors.correo}
              value={userInfo ? userInfo.Correo : ""}
            />
          </div>

          <div>
            <p>Si necesitas cambiar tu "password" acercate a un empleado de banchido</p>
          </div>
          <button className="btn btn-primary" onClick={() => handleEditProfile()}>
            Editar
          </button>
        </div>
      </div>
    </ActionsPageWrapper>
  );
}

export default EditarPerfilActPage;
