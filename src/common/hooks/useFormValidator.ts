function useFormValidator() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email: string): boolean => {
    const resultado = emailPattern.test(email);
    return resultado
  }

  const validatePassword = (password: string): boolean => {
    if(password.length !== 4 ){
      return false;
    } 

    return true;
  }

  return {validateEmail, validatePassword}
}

export default useFormValidator
