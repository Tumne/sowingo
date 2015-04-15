<a href="https://www.sowingo.com/">![Logo](app/www/img/sowingo.png)</a>


# sterilization-mobile-app

IOS application for obtaining sowingo account sterilization records.

## Installation

Clone the github repository

    git clone git@github.com:sowingocorp/sterilization-mobile-app.git

## Usage

### Install Ionic:

    npm install -g cordova ionic
    npm install -g ios-sim

NOTE: You must have [node](http://nodejs.org/download/) installed to complete this step.


### IOS iPad simulator:

To simulate the app in an iPad you will need to download and install [xcode](https://developer.apple.com/xcode/downloads/).
Type the following into your terminal:

    cd sterilization-mobile-app/app/
    ionic build ios
    ionic emulate ios --target="iPad-2"

Then:

In your IOS Simulator under the **Hardware** tab, click on **Device Left** to simulate a landscape view for the iPad.


### Debugging:

To launch a desktop test version of the app, type the following into your terminal:

    cd sterilization-mobile-app/app/
    ionic serve

 
## Developer's Notes


So, heres what we need.
the url will be sterilization.sowingo.com

we want the design to really pop and have people wanting to use this basic feature

so the login page:
-email
-password
-forgot password link
-go to full site 

once logged in:
you choose the location you want to manage (so a nice easy way to change through locations) and always show you what location you are at

once you choose the location (and if theres only one - you just use that one):
you should have a easy way to manage between biological and chemical testing
clicking on one of those will provide history as shown in the mocks attached

there needs to be add sterilization record for both:
the details of what is required is in the mocks

For now lets use fake data and on monday we can sync on how to connect with our api and do logins. 

Again I am available all weekend, so email or call me if you have questions.

FYI - no tutorial video yet.

------------------------------

#### [Update] 03/09/2015

The following issues need to be resolved:

1. **[RESOLVED]** ~~Portrait View off.~~ 
2. **[RESOLVED]** ~~Offices UI list improvement needed~~ 
3. **[RESOLVED]** ~~The UI, logo, and color, needs an overall design improvement~~
4. **[RESOLVED]** ~~On 'office' change, does not display records.~~ 
5. **[RESOLVED]** ~~Adding new record does not add the record to the list bug.~~ 
6. **[RESOLVED]** ~~Error Validation on forms~~
7. **[RESOLVED]** ~~Notifications on forms~~

------------------------------

#### [Update] 03/12/2015

The following issues need to be resolved:

1. **[RESOLVED]** ~~Date/Time should merge them~~
2. **[RESOLVED]** ~~Notifications standard popup~~
3. **[RESOLVED]** ~~Change color of disabled field.~~





