import { postData } from "../utils/httpReq.js";
import { setCookies  } from "../utils/cookies.js";
import { authHandler } from "../utils/authorization.js";
import { validateForm } from "../utils/validation.js";

const inputs = document.querySelectorAll("input");
const button = document.querySelector(".submit__btn");

const submitHandler = async (event) => {
  event.preventDefault();

  const username = inputs[0].value;
  const password = inputs[1].value;

  const validation = validateForm(username,password)
  if(!validation) return


  const response = await postData("auth/login",{
    username,
    password
  });
  setCookies(response.token)
  location.assign("index.html")
};

const init = ()=>{
  authHandler()
}


button.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded",init)