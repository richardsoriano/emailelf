const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// input is a string of comman separated emails.
// convert it into an array of emails
// split(',')
// e.g.
// ' good@email.com, invalid@mail, good@mail2.com  '
// good2@mail.com
// trim() removes spaces at the beg, end.
// filter()
// checks the validity of email
// function returns 'invalid@mail

export default (emails) => {
  var invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);

  const emailArray = emails.split(",").map((email) => email.trim());
  var lastEmail = emailArray[emailArray.length - 1];

  // fix for if it ends with a ','
  if (lastEmail === "" || lastEmail.length === 0) {
    invalidEmails = emailArray[emailArray.length - 2] + `,`;
  }

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return null;
};
