import { sha256 } from "js-sha256";

function cifrarPassword(password: string): string {
  var hash = sha256.create();
  hash.update(password);
  hash.hex();

  return hash.toString();
}

export default cifrarPassword
