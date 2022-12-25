# Gym Bros
Simple web app for testing aroung with the bookings needed

## How does it work?
It is a simple React webapp hosted on firebase that allows to easily automate booking for your gym slots.
The functioning is separated into three steps:
* React Frontend
* Firestore
* Firebase Functions

# REACT FRONTEND
Nothing interesting to see here, mainly a frontend webapp with react-router-dom.
There's definitely room for improvemente in different areas.
The app is divided into:
* pages -> Booking / Homepage / Info / Settings / Signup
* components -> SingleBooking / TopBar
Each page has its own routing and functionalities

# FIRESTORE
Carefully read firestore.rules in order to better understand how data privacy is enforced.
There are two collections:
* credentials -> ```{ credentials: ['', ''], user: uid }```
* timetables -> ```{table: ['X', 'X', 'X', 'X', 'X', 'X', 'X'], user: uid}```
Credentials represents the logging info for the gym
TimeTable represents the user preferences when it comes to booking a slot. Note that the ```table``` property is intended as index = 0 -> Monday

# FIREBASE FUNCTIONS
There are two functions:
* initUser -> create on user registration a template for both instances in the two collections of credentials and timetables. Default value are displayed in the firestore section
* cyclingBookingPubSub -> everyday at 12 AM (Europe/Rome timezone) the function will try to book slots for each and every user currently registered in the website

The whole thing was made possible by puppeteer, look into my other  repositories for the actual brain of the pubsub function.
NOTE: A downgraded version of puppeteer is being used as the newer ones are completely broke with gcloud functions