# Manifest from Motiv
Manifest Your Destiny
![Alt text](/assets/screenshots/Screenshot_20190824-154528.png?raw=true)

# Description
Automate your savings growth by quitting your vices! After signup, answer a few quick questions about your goals, what vice you'd like to give up in order to reach that goal, and how frequently you spend money on said vice. Manifest will do the rest for you! Each week, Manifest will take the money you saved from quitting your vice and deposit it into your savings account, without you having to lift a finger! If allowed, Manifest will also track your location and send you positive reinforcement if you are in the vicinity of a place that sells your vice.

# Current Vice Options
- Smoking
- Coffee
- Fast Food

# Signing Up
Signup and login quickly and easily with your Google account.

# How To Use
This is a mobile app built using Expo. To use it, you'll need to run the following:
`$ npm install`
`$ npm start` OR `$ expo start`
**** It is recommended to use `expo start` and to have an account with expo in order to make sure all aspects of the app work. This is mainly due to the way Expo handles authentication.

***** For proper functioning of goal progress circle on GoalsSummaryScreen delete line 204 of `node_modules/react-native-progress/Circle.js` and replace it with: 
`{progress ? formatText(progress._value) : this.forceUpdate()}` 

In order to run Manifest, you'll also have to download the Node server.
https://github.com/motivapps/manifest-server

# Necessary API keys
In order to use, you'll need a `.env` file in the root directory with credentials from the following APIs:
Plaid
Foursquare
