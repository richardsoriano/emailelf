Survey.updateOne(
  {
    id: surveyID,
    recipients: {
      $elemMatch: { email: email, responded: false },
    },
  },
  {
    $inc: { [choice]: 1 },
    $set: { "recipients.$.responded": true },
  }
);
