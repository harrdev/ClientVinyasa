# Yoga

## Wireframes
https://miro.com/app/board/uXjVOXGZm4I=/?invite_link_id=489495930807

## User Stories
    1. As a user, you will be able to create and login to the Yoga app.

    2. You will be able to customize a yoga session.
        * You will be able to choose from beginner, intermediate, and advanced Asanas.
        * Based on which level you choose from, a list of Asanas will appear for you to select from.

    3. The Asanas that you choose will be saved into your routine.
        * There will be a routine area on the same page to see which Asanas you chose.

    4. Within that same page, a user will be able to drag and drop to re-arrange the order of your routine.  
        * A user will be able to add, edit, delete, and save the routine.
        * A user will be able to set a timer for how long this routine will last.
    
    5. On the routine page, once the user starts the routine, the timer begins and a slideshow of the Asana poses be displayed for the duration selected on each pose.
        * Music will begin playing once the routine starts.
    
    6. On the profile page, a user will be able to view their saved routines and a Progress Module will be displayed showing how many days the user has been active with their routines.
        * Once a saved routine is clicked on, it will load images for each pose in the routine.  
        * There will be 2 buttons once a saved routine is clicked on.  "Start Routine" and "Edit Routine".
        * If "Edit Routine" button is clicked on, it redirects towards the Create Routines page to be able to add, edit, delete Asanas within that saved routine.


## Tech Stack
1. MERN
    * MongoDB
    * Express
    * React
    * Node

## Database Models
    * User
    * Beginner Asanas
    * Intermediate Asanas
    * Advanced Asanas
        * Asana collections will include "Name", "Video URL", "Description"
    * User Routines
        * User Routine collections will include "Name", "Routine: Array of Objects"

## MVP
1. All user stories functional.
2. Drag and Drop to re-arrange routines.
3. Progress tracker, including a calendar module to visually show progress.
4. Databases seeded with Yoga Asana information.
5. 5 pages - Login/Signup, Routine Creation, Show/Details page, Profile page, Start Routine Page.
6. On Start Routine page, a slideshow of poses shows up and displays Asana position and is timed to match how long each pose is setup for.

## Stretch Goals
1. Avatar options for profile picture
2. Expand music options with ability to choose music
3. Allow users to create and add new Asanas

## Version 2
1. Incorporate Tensorflow with ability to track pose form with correct form and notify when form is broken.