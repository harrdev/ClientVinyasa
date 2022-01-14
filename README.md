
# Vinyasa Builder

### Server Repo - https://github.com/harrdev/ServerVinyasa
### Client Repo - https://github.com/harrdev/ClientVinyasa  

**Created by: Hannah Legros and Jason Harr**  

## App Objectives
* With Vinyasa builder you can create your custom Yoga routine.
* Upon registration/login, a user can select which difficulty poses they would like to learn about and add to their routine.
* Once poses are selected to be added to the create routine pane of the page, drag and drop is enabled to arrange the routine as the user would prefer.
* A "detail" page is available to learn benefits of the pose.
* Submitted/saved routines are stored in the user's profile page.
* In the profile page, a user can delete or start their routine.
* In the Start Routine page, a slideshow displays the images of that pose to demonstrate proper form.

## Project Prerequisites
1. Install packages: npm i
2. Seed database
    * In server-vinyasa project: node seeds/seeds.js
3. Tech Stack
    * MongoDB, Express, React, Node.js

## Project Documentation
* Wireframes - https://miro.com/app/board/uXjVOXGZm4I=/?invite_link_id=489495930807
![This is an image](/src/images/wireframes.png)
* Database ERD - https://lucid.app/lucidchart/f7953477-1cef-49e8-b9c3-18907f6878cb/edit?invitationId=inv_9ebbdd61-51d0-4961-b49c-417a63a28f83&page=0_0#
![This is an image](/src/images/databaseErd.png)

## Approach 
The approach to this project was to build the server with Node.js and Express, and to build the client in React.  Database models created and interfaced with Mongoose.  Yoga poses were selected and data was seeded into database.  We chose seeding a database vs using an API as there were not many options for a yoga API.
## Unsolved Problems / Version 2
1. Implement drag out of pane feature for removing a pose from the created routine page
2. Implement a timer for slideshow to change on an interval based on how long a routine is set for
3. Implement a music option to play during Start Routine
4. Implement EDIT function to edit a saved routine

## Version 3
1. Implement Tensorflow to detect user's pose form and send notice if form is not correct





