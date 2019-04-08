# InspectApp
tz-branch
2/13 - add messages table and fixed the seeders and added relations between tables
2/14 - User sends 3 skills to backend (house,car,fish tank)
- Info gets sent to backend.
- First we would create an inspector to then reference in the user table.
- Next we search the skills table to see if these skills are already created. 
- Then we create a row in the pivot table for each skill the inspector has.


- Inspector registers with all of there info. Done
- We then send that info to the backend. Done(through postman)
- We create a user for them  in the user table. Done
- Then we need to create an inspector row for them as well Done.
- This we will need to create a reference Id for them in the user table that references their inspector Id. Done
- Then we need to check to see if their skills have already been created before. Done.
- We would do this using the Database Model. Done.
- It would find where there are skill colums then if there is a match refrences that Id of the skill.
- If there wasn't a match for that skill we would then want to create a new skill with that and grab that Id Done.
- We would have to do this for each skill they have so we need a loop. Done.

- Make sure to check and make sure that inspector doesn't already have that skill created in the pivot table.

- User Clicks on Inspector.
- User Then Clicks On a Button allowing them to submit an Inspection Request for an Item - Done
- A form Opens up then the User has to click -Done
- The User Would have to list what the Item to be Inspected is -Done
- The Form would Have an Item and A link to the item. -Done
- Then they would Submit the Form. -Done
- That Information Gets stored in the backend with the User Id, The Inspector Id, The Item Requested To Be Inspected, The Item Url, and A True False for the Inspector to Accept the Request. -Done
- The Inspector Would Then Login to His Profile and He could View all pending Requests. -Done
- We would have a call to the backend when brought to that page and it would grab all pending inspections for the inspector where the inspector id is equal to the inspector logged in. -Done (I need help on this because I can't think of how to do this)
- Then we need two buttons one for an ability to accept the inspection and one to deny the inspection. -Done
- If the Inspector clicks deny we would send that to the backend and reset the state with the requests. -Done
- If the Inspector accept we would then also do a backend call add that to the database and then put that accpeted request in the accpeted column. -Done
- Once the Inspection is in the accepted area we would need a button to create an Inspection.
- Once that Inspector Clicks we would take them to a page to upload the inspection report. 
- On that click we would send a call to the backend to create a row in the backend to start an inspection.
- It would take in the user id, inspector id, 