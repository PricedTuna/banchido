import ActionButton from "../components/ActionButton";
import ActionsPageWrapper from "./components/ActionsPageWrapper";

function ActionsPage() {
  return (
    <ActionsPageWrapper>
      <h1>Acciones</h1>
      <div className="d-grid gap-2 col-6-md mx-auto">
        <ActionButton page="transfer" title="Transferencia" />
        <ActionButton page="RST" title="Retiro sin tarjeta" />
        {/* <ActionButton page="add-card" title="Agregar una tarjeta a mi cuenta" /> */}
        <ActionButton page="edit-profile" title="Editar perfil" />
      </div>
    </ActionsPageWrapper>
  );
}

export default ActionsPage;
