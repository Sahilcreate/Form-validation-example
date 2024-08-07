;(function () {
  const userName = document.getElementById("user-name");
  userName.classList.add("invalid");
  userName.addEventListener("input", checkUserName);

  const userMail = document.getElementById("user-mail");
  userMail.classList.add("invalid");
  userMail.addEventListener("input", checkUserMail);

  const userCountry = document.getElementById("user-country");
  userCountry.addEventListener('change', checkZip);

  const userZIP = document.getElementById("user-zip");
  userZIP.classList.add("invalid");
  userZIP.addEventListener('input', checkZip);

  const userPwd = document.getElementById("user-pwd");
  userPwd.classList.add("invalid");
  userPwd.addEventListener("input", checkPassword);

  const userConfirmPwd = document.getElementById("user-confirm-pwd");
  userConfirmPwd.classList.add("invalid");
  userConfirmPwd.addEventListener("input", checkPassword);

  const pwdCheckbox = document.getElementById("show-pwd-checkbox");
  pwdCheckbox.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      document.getElementById("user-pwd").type = "text";
      document.getElementById("user-confirm-pwd").type = "text";
    } else {
      document.getElementById("user-pwd").type = "password";
      document.getElementById("user-confirm-pwd").type = "password";
    }
  });

  document.getElementById("submitBtn").addEventListener("click", (event) => {
    event.preventDefault();
    checkUserName();
    setTimeout(checkUserMail, 2000);
    setTimeout(checkZip, 4000);
    setTimeout(checkPassword, 9000);
  })

  console.log("window load");
})();

function checkUserName () {
  console.log("checking user name");
  const nameField = document.getElementById("user-name");

  if (nameField.value.length > 0 && nameField.value.length <= 20) {
    nameField.setCustomValidity("");
    nameField.classList.remove("invalid");
  } else {
    nameField.setCustomValidity("Username should be less than 20 characters");
    nameField.reportValidity();
    nameField.classList.add("invalid");
  }
}

function checkUserMail () {
  console.log("checking user mail");
  const userMail = document.getElementById("user-mail");

  if(!userMail.validity.typeMismatch) {
    userMail.setCustomValidity("");
    userMail.classList.remove("invalid");
  } else {
    userMail.setCustomValidity("Email should be of format 'abc@pqr.xyz' or 'abc@pqr'");
    userMail.reportValidity();
    userMail.classList.add("invalid");
  }
}

function checkZip () {
  console.log("checking zip code");
  const constraints = {
    in: [
        "^[1-9]\\s?\\d{5}$",
        "India ZIP's must have exactly 6 digits and not start with '0': e.g. 324525 or 324 525"
    ],
    ch: [
        "^[1-9]\\d{5}$",
        "China ZIP's must have exactly 6 digits and not start with '0': e.g 324525"
    ],
    jp: [
        "^\\d{3}-\\d{4}$",
        "Japan ZIP's must follow NNN-NNNN: e.g. 408-0301"
    ],
    kr: [
        "^\\d{5}$",
        "South Korea ZIP's must have exactly 5 digits: e.g. 01000"
    ],
    us: [
        "^\\d{5}(-\\d{4})?$",
        "USA ZIP's can be of format 'NNNNN' or 'NNNNN-NNNN': e.g. 01001 or 10001-0001"
    ],
    ge: [
        "^\\d{4}$",
        "Georgia ZIP's must have exactly 4 digits: e.g. 0100"
    ]
  };

  const country = document.getElementById("user-country").value;

  const ZIPField = document.getElementById("user-zip");

  const constraint = new RegExp(constraints[country][0]);

  if(constraint.test(ZIPField.value)) {
    ZIPField.setCustomValidity("");
    ZIPField.classList.remove("invalid");
  } else {
    ZIPField.setCustomValidity(constraints[country][1]);
    ZIPField.reportValidity();
    ZIPField.classList.add("invalid");
  }
}

function checkPassword () {
  console.log("checking password");
  const pwdRegExp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,16}$";

  const pwdField = document.getElementById("user-pwd");
  const confirdPwdField = document.getElementById("user-confirm-pwd");

  const constraint = new RegExp(pwdRegExp);

  if (constraint.test(pwdField.value)) {
    if (pwdField.value === confirdPwdField.value) {
      confirdPwdField.setCustomValidity("");
      confirdPwdField.classList.remove("invalid");
    } else {
      confirdPwdField.setCustomValidity("Passwords should match!");
      confirdPwdField.reportValidity();
      confirdPwdField.classList.add("invalid");
    }
    pwdField.setCustomValidity("");
    pwdField.classList.remove("invalid");
  } else {
    pwdField.setCustomValidity("Password must be 8-16 characters, must contain at least one UpperCase, one lowercase, one number & one special character (except underscore)");
    pwdField.reportValidity();
    pwdField.classList.add("invalid");
  }
}

