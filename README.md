Go One is a real-time dashboard for real-estate apps built with [Meteor](http://meteor.com)

###Getting Started

1. Install [meteor](https://docs.meteor.com/#/full/quickstart)

2. Run mongo with text search (>= 2.6). Needed until [meteor upgrades mongo](https://github.com/meteor/meteor/issues/2036).

    `mongodb`

3. Run the application

    `MONGO_URL="mongodb://localhost:27017/meteor" meteor --settings settings.development.json`