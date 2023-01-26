const isRequerido = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};

const isNumber = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};

const validateSimple = ({
  input,
  required = true,
  email = false,
  max = false,
  min = false,
  long = false,
}) => {
  let response = {
    error: false,
    error_msg: null,
  };

  if (max) {
    if (input.length > max) {
      response.error = true;
      response.error_msg = "Digitos maximos " + max;
    }
  }

  if (min) {
    if (input.length < min) {
      response.error = true;
      response.error_msg = "Digitos minimos " + min;
    }
  }

  if (long) {
    if (input.length != long) {
      response.error = true;
      response.error_msg = "Longitud debe ser igual a " + long;
    }
  }

  if (email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
      response.error = true;
      response.error_msg = "Correo incorecto";
    }
  }

  if (required) {
    if (input.length < 1) {
      response.error = true;
      response.error_msg = "Obligatorio";
    }
  }

  return response;
};

export { isNumber, validateSimple };
