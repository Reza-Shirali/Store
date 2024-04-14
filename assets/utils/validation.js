const validUsername = (username) => {
  const regex = /^[a-zA-Z\d_]{4,16}$/;
  const result = regex.test(username);
  return result;
};

const validPassword = (password) => {
  const regex = /^.{4,20}$/;
  const result = regex.test(password);
  return result;
};

const validateForm = (username, password) => {
    const usernameResult = validUsername(username)
    const passwordResult = validPassword(password)

    
    if(usernameResult && passwordResult){
        return true
    }else if(!usernameResult){
        alert("Username is not valid!")
        return false
    }else if(!passwordResult){
        alert("Password must be between 4 and 20 characters!")
        return false
    }
};

export { validateForm };
