const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");
module.exports = (app) => {
  app.get("/api/surveys/:surveyID/:choice", (req, res) => {
    res.send("Thank you for voting! Next time vote in person");
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    //  const events = _.map(req.body, ({ email, url }) => {
    //   const pathname = new URL(url).pathname;
    //   const p = new Path("/api/surveys/:surveyID/:choice");
    //   const match = p.test(new URL(url).pathname);
    //   if (match) {
    //     return { email, surveyID: match.surveyID, choice: match.choice };
    //   }
    // });

    // const compactEvents = _.compact(events);
    // const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyID");

    // console.log(uniqueEvents);

    // res.send({});

    const p = new Path("/api/surveys/:surveyID/:choice");
    console.log(req.body);
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyID: match.surveyID, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyID")
      .each(({ surveyID, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyID,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422);
    }
  });
};
