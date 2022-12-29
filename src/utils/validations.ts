import { defineRule } from "vee-validate";
import { email, required, min, max } from "@vee-validate/rules";

defineRule("email", (value: string) => {
  if (!email(value)) {
    return "Invalid e-mail";
  } else if (!required(value)) {
    return "Email is required";
  }
  return true;
});

defineRule("password", (value: string) => {
  if (
    required(value) &&
    min(value, { length: 6 }) &&
    max(value, { length: 30 })
  ) {
    return true;
  }

  return "Password must be between 6 and 30 characters";
});
defineRule("name", (value: string) => {
  return max(value, { length: 60 })
    ? true
    : "Name may not exceed 60 characters";
});
// defineRule("confirmPassword", (value, [target], ctx) => {
//   if (required(value) && value === ctx.form[target]) {
//     return true;
//   }

//   return "Passwords must match";
// });

// use regex patter for URL
// defineRule("url", (value: string) => {
//   const pattern = new RegExp(
//     "^(https?:\\/\\/)" + // protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//       "(\\#[-a-z\\d_]*)?$",
//     "i"
//   );

//   return pattern.test(value) || value.length === 0
//     ? true
//     : "Website must be a valid URL";
// });
