const { Event } = require("../models/events");
const { authenticate } = require("../middleware/authenticate");
//const { Setting } = require("../models/settings");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   Event.find({}, (err, events) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(events);
//   });
// });
// router.get("/byCity", (req, res) => {
//   console.log(req.query.city);
//   Event.find({ city: req.query.city }, (err, events) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(events);
//   });
// });
router.get("/", authenticate, (req, res) => {
  let filters = {};
  let city = "";
  let state = "";
  let category = "";
  let srchStr = "";
  if (req.currentUser.defaultCity) city = req.currentUser.defaultCity;
  if (req.currentUser.defaultState) state = req.currentUser.defaultState;
  if (req.query.category) category = req.query.category;
  else if (req.query.srchStr) srchStr = req.query.srchStr;

  if (category) {
    if (city && state) {
      filters = { city: city, state: state, category: category };
    } else filters = { category: category };
  } else if (srchStr) {
    if (city && state)
      filters = {
        city: city,
        state: state,
        $or: [
          { name: { $regex: "/*" + srchStr + "/*" } },
          { location: { $regex: "/*" + srchStr + "/*" } }
        ]
      };
    else filters = { name: { $regex: "/*" + srchStr + "/*" } };
  } else {
    if (city && state) filters = { city: city, state: state };
  }
  Event.find(filters, (err, events) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(events);
  });

  // Setting.findOne({ uid: uid }, (err, setting) => {
  //   if (err) {
  //     return res.status(400).send(err);
  //   }
  //   console.log(setting);
  //   if (setting && setting.filterCity) {
  //     city = setting.filterCity;
  //     state = setting.filterState;
  //     console.log(city, state);
  //   }
  //   if (category) {
  //     if (city) {
  //       filters = { city: city, state: state, category: category };
  //     } else {
  //       filters = { category: category };
  //     }
  //   } else if (srchStr) {
  //     if (city) {
  //       filters = {
  //         city: city,
  //         state: state,
  //         name: { $regex: "/*" + srchStr + "/*" }
  //       };
  //     } else {
  //       filters = { name: { $regex: "/*" + srchStr + "/*" } };
  //     }
  //   } else {
  //     if (city) {
  //       filters = { city: city, state: state };
  //     } else filters = {};
  //   }
  //   Event.find(filters, (err, events) => {
  //     if (err) return res.status(400).send(err);
  //     return res.status(200).send(events);
  //   });
  // if (setting && setting.filterCity) {
  //   const city = setting.filterCity;
  //   if (srchStr) {
  //     const str = `/${srchStr}/`;
  //     Event.find({ city: city, name: { $regex: str } }, (err, events) => {
  //       if (err) return res.status(400).send(err);
  //       return res.status(200).send(events);
  //     });
  //   } else if (category) {
  //     Event.find({ city: city, category: category }, (err, events) => {
  //       if (err) return res.status(400).send(err);
  //       return res.status(200).send(events);
  //     });
  //   } else {
  //     Event.find({ city: city }, (err, events) => {
  //       if (err) return res.status(400).send(err);
  //       return res.status(200).send(events);
  //     });
  //   }
  // } else {
  //   Event.find({}, (err, events) => {
  //     if (err) return res.status(400).send(err);
  //     return res.status(200).send(events);
  //   });
  // }
  //});
});
router.get("/id", (req, res) => {
  let id = req.query.id;

  Event.findOne({ _id: id }, (err, event) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(event);
  });
});
function validate(data) {
  console.log(data);
  let errors = {};
  if (data.name === "") errors.name = "Missing/Invalid name";
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}
router.post("/", authenticate, (req, res) => {
  // res.status(200).json({ success: true, user: req.currentUser });
  //const { errors, isValid } = validate(req.body);
  const {
    name,
    location,
    eventTime,
    eventDate,
    address,
    city,
    state,
    description
  } = req.body;
  // if (!isValid) {
  //   return res.status(401).json({ errors: { form: errors } });
  // }
  let newEvent = {
    name: name,
    location: location,
    eventTime: eventTime,
    eventDate: eventDate,
    address: address,
    city: city,
    state: state,
    description: description,
    username: req.currentUser.username,
    uid: req.currentUser._id
  };
  const event = new Event(newEvent);
  //res.status(201).json({ success: true });
  Event.findOne(
    {
      name: name,
      location: location,
      eventTime: eventTime,
      eventDate: eventDate
    },
    function(err, existingEvent) {
      if (err) {
        return res.status(401).json({ errors: { form: err } });
      }
      if (existingEvent) {
        return res
          .status(422)
          .json({ errors: { form: "Event already exists" } });
      }
      event.save(function(err) {
        if (err) {
          return res.status(423).json({ errors: { form: err } });
        }
        res.status(200).json({ success: true });
      });
    }
  );
});
router.post("/update", (req, res) => {
  let id = req.query.id;
  const { name, location, eventTime, eventDate } = req.body;

  const { errors, isValid } = validate(req.body);

  // if (!isValid) {
  //   console.log("error", "invalid name");
  //   return res.status(401).json({ success: false, errors });
  // }

  //res.status(201).json({ success: true });
  // Event.findOne({ _id: id }, function(err, existingEvent) {
  //   if (err) {
  //     console.log("error", err);
  //     return res.status(421).json({ success: false, err });
  //   }
  //   if (existingEvent) {
  //     console.log("error", "Event already exists");
  //     return res.status(422).send({ err: "Event already exists" });
  //   }
  // });

  Event.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.satus(402).json({ errors: { form: err } });
      res.status(200).json({ success: true });
    }
  );
});
module.exports = router;
