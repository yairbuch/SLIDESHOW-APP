import { onInputChange, onReset } from "../../forms/utils/formMethods.js";
import PAGES from "../../routes/pageModel.js";
import { onChangePage } from "../../routes/router.js";
import {
  LOGIN_EMAIL_FIELD,
  LOGIN_EMAIL_ERROR,
  LOGIN_PASSWORD_FIELD,
  LOGIN_PASSWORD_ERROR,
  LOGIN_SUBMIT_BTN,
  SIGN_UP_EMAIL_FIELD,
  SIGN_UP_EMAIL_EROR,
  SIGN_UP_PASSWORD_FIELD,
  SIGN_UP_PASSWORD_EROR,
  SIGN_UP_SUBMIT_BTN,
  SIGN_UP_CANCEL_BTN,
  SIGN_UP_PHONE_FIELD,
  SIGN_UP_PHONE_EROR,
  SIGN_UP_NAME_FIELD,
  SIGN_UP_NAME_EROR,
  SIGN_UP_LASTNAME_FIELD,
  SIGN_UP_LASTNAME_EROR,
  SIGN_UP_STATE_FIELD,
  SIGN_UP_STATE_EROR,
  SIGN_UP_COUNTRY_FIELD,
  SIGN_UP_COUNTRY_EROR,
  SIGN_UP_CITY_FIELD,
  SIGN_UP_CITY_EROR,
  SIGN_UP_STREET_FIELD,
  SIGN_UP_STREET_EROR,
  SIGN_UP_HOUSE_FIELD,
  SIGN_UP_HOUSE_EROR,
  SIGN_UP_ZIP_FIELD,
  SIGN_UP_ZIP_EROR,
  SIGN_UP_REPASSWORD_FIELD,
  SIGN_UP_REPASSWORD_EROR,
  SIGN_UP_ISBUSINESS_FIELD,
  CREATE_PIC_PAGE_LINK,
  LOGOUT_PAGE_LINK,
  LOGIN_PAGE_LINK
} from "../../services/domService.js";
import User from "../models/User.js";
import useForm from "./../../forms/useForm.js";
import { removeToken, setToken } from "./localStorageService.js";

export const login = () => {
  const INITIAL_LOGIN_FORM = {
    email: "",
    password: "",
  };

  const LOGIN_SCHEMA = {
    email: "email",
    password: "password",
  };

  const LOGIN_INPUTS_ARRAY = [LOGIN_EMAIL_FIELD, LOGIN_PASSWORD_FIELD];
  const LOGIN_ERROR_ARRAY = [LOGIN_EMAIL_ERROR, LOGIN_PASSWORD_ERROR];

  const handleLoginSubmit = data => {
    const dataPass = data.password;
    const dataMail = data.email;
    const user1 = users.find(item => item.email === dataMail && item.password === dataPass);
    if (!user1) alert('user email or password are incorrect, please try again');
    const usertoLS = new Object();
    usertoLS.id = user1._id;
    usertoLS.isAdmin = user1.isAdmin;
    usertoLS.isBusiness = user1.isBusiness;
    setToken(usertoLS);
    window.user = user1;

    onReset(
      LOGIN_INPUTS_ARRAY,
      LOGIN_ERROR_ARRAY,
      LOGIN_SUBMIT_BTN,
      form.handleReset
    );

    onChangePage(PAGES.HOME);
    CREATE_PIC_PAGE_LINK.className = 'nav-link cursor d-block';
    LOGOUT_PAGE_LINK.className = 'nav-link cursor d-block';
    LOGIN_PAGE_LINK.className = 'd-none';

    LOGOUT_PAGE_LINK.addEventListener("click", () => {
      removeToken(usertoLS);
      window.user = null;
      LOGIN_PAGE_LINK.className = 'nav-link cursor d-block';
      LOGOUT_PAGE_LINK.className = 'd-none';
      CREATE_PIC_PAGE_LINK.className = 'd-none';
      console.clear();
      console.log(`user after logut is: ${window.user}`);

    })
  };

  const form = useForm(INITIAL_LOGIN_FORM, LOGIN_SCHEMA, handleLoginSubmit);

  LOGIN_EMAIL_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      LOGIN_EMAIL_ERROR,
      LOGIN_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  LOGIN_PASSWORD_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      LOGIN_PASSWORD_ERROR,
      LOGIN_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  LOGIN_SUBMIT_BTN.addEventListener("click", form.onSubmit);
};

export const signup = () => {
  const INITIAL_SIGN_UP_FORM = {
    email: "",
    password: "",
    name: "",
    namelast: "",
    repassword: "",
    // state: "",
    // country: "",
    // city: "",
    // street: "",
    // house: "",
    // zip: "",
    // phone: ""
  };

  const SIGN_UP_SCHEMA = {
    email: "email",
    password: "password",
    name: ["min", 2],
    namelast: ["min", 2],
    repassword: "password",
    state: ["min", 2],
    country: ["min", 2],
    city: ["min", 2],
    street: ["min", 2],
    house: "number",
    zip: "number",
    phone: ["regex", /^0[0-9]{1,2}(-?|\s?)[0-9]{3}(-?|\s?)[0-9]{4}/g]

  };

  const SIGN_UP_INPUTS_ARRAY = [SIGN_UP_EMAIL_FIELD, SIGN_UP_PASSWORD_FIELD, SIGN_UP_PHONE_FIELD, SIGN_UP_NAME_FIELD, SIGN_UP_LASTNAME_FIELD, SIGN_UP_STATE_FIELD, SIGN_UP_COUNTRY_FIELD, SIGN_UP_CITY_FIELD, SIGN_UP_STREET_FIELD, SIGN_UP_HOUSE_FIELD, SIGN_UP_ZIP_FIELD, SIGN_UP_REPASSWORD_FIELD];

  const SIGN_UP_ERROR_ARRAY = [SIGN_UP_EMAIL_EROR, SIGN_UP_PASSWORD_EROR, SIGN_UP_PHONE_EROR, SIGN_UP_NAME_EROR, SIGN_UP_LASTNAME_EROR, SIGN_UP_STATE_EROR, SIGN_UP_COUNTRY_EROR, SIGN_UP_CITY_EROR, SIGN_UP_STREET_EROR, SIGN_UP_HOUSE_EROR, SIGN_UP_ZIP_EROR, SIGN_UP_REPASSWORD_EROR];


  const handleSignupSubmit = data => {
    try {
      const {
        email,
        password,
        name,
        namelast,
        state,
        country,
        city,
        street,
        house,
        zip,
        phone,

      } = data;

      const newData = {
        name: { first: name, last: namelast },
        email: email,
        password: password,
        address: {
          state: state,
          country: country,
          city: city,
          street: street,
          houseNumber: +house,
          zip: +zip,
        },
        phone: phone,
        isBusiness: SIGN_UP_ISBUSINESS_FIELD.checked
      };
      if (SIGN_UP_PASSWORD_FIELD.value !== SIGN_UP_REPASSWORD_FIELD.value) {
        alert('The password is not the same, please try again');
        onChangePage(PAGES.SIGNUP);
      } else {
        const user = new User(newData, users);
        onReset(SIGN_UP_INPUTS_ARRAY, SIGN_UP_ERROR_ARRAY, SIGN_UP_SUBMIT_BTN, form.handleReset);
        users.push(user);
        console.log(user);
        console.log(users);
        alert('Regestion was successfull! please login');
        // onChangePage(PAGES.LOGIN);

        LOGOUT_PAGE_LINK.addEventListener("click", () => {
          removeToken(usertoLS);
          window.user = null;
          LOGIN_PAGE_LINK.className = 'nav-link cursor d-block';
          LOGOUT_PAGE_LINK.className = 'd-none';
          CREATE_PIC_PAGE_LINK.className = 'd-none';
          console.clear();
          console.log(`user after logut is: ${window.user}`);

        })


      }
    } catch (error) {
      console.log(error);
    }

  };

  const form = useForm(INITIAL_SIGN_UP_FORM, SIGN_UP_SCHEMA, handleSignupSubmit);

  SIGN_UP_EMAIL_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_EMAIL_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  SIGN_UP_PASSWORD_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_PASSWORD_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  SIGN_UP_NAME_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_NAME_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  SIGN_UP_LASTNAME_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_LASTNAME_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  SIGN_UP_REPASSWORD_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_REPASSWORD_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn

    );
  });


  SIGN_UP_STATE_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_STATE_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_STREET_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_STREET_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_CITY_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_CITY_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_ZIP_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_ZIP_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_COUNTRY_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_COUNTRY_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_HOUSE_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_HOUSE_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });


  SIGN_UP_PHONE_FIELD.addEventListener("input", event => {
    onInputChange(
      event,
      SIGN_UP_PHONE_EROR,
      SIGN_UP_SUBMIT_BTN,
      form.handleInputChange,
      form.handleDisableSubmitBtn
    );
  });

  SIGN_UP_SUBMIT_BTN.addEventListener("click", form.onSubmit);
  SIGN_UP_CANCEL_BTN.addEventListener("click", () =>
    onReset(SIGN_UP_INPUTS_ARRAY, SIGN_UP_ERROR_ARRAY, SIGN_UP_SUBMIT_BTN, form.handleReset))
};


