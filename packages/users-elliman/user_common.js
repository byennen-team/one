User = {};

User.model = {
  // _id is optional because it might not be created yet
  _id: Match.Optional(String),
  emails: Match.Optional([
    {
      address: MatchEx.Email(),
      verified: Boolean
    }
  ]),
  profile: Match.Optional({
    id: Number,
    firstName: String,
    lastName: String,
    location: {
      cityId: Number,
      stateId: Number,
      zipCode: Number
    },
    numbers: {
      fax:  Match.Optional(Number),
      mobile: Match.Optional(Number),
      phone: Match.Optional(Number),
      phoneExtension: Match.Optional(Number)
    },
    officeId: Number,
    photoUrl: Match.Optional(MatchEx.Url()),
    title: String
  })
};
