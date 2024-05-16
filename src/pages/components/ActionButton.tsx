import { Link } from "react-router-dom";

interface Props {
  page: string;
  title: string;
}

function ActionButton({ page, title }: Props) {
  return (
      <Link to={`/${page}`} className="btn btn-primary px-3 py-2">
        {title}
      </Link>
  );
}

export default ActionButton;
