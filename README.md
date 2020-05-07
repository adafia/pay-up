# pay-up

## Project setup
> clone the project

> install all dependencies on both client and server side

> follow example.default.json file in the config directory to setup your default.json file

> npm run dev to start the project


# POST-MORTEM
## current status
  - basic user interface
  - upload .xlsx file through the front-end
  - display uploaded file
  - display computation preview
  - allow user to confirm/approve computed data
  - save uploaded file into the database
  - save computed data
  - compute overides (upload records with specified SeasonIDs)
  - update customer summaries
  - display computed data

## Estimate on outstanding work
 - cascade                      [1 day] 
 - Overpaid                     [5 hours]
 - validate uploads             [2 hours]
 - Unit testing                 [3 hours]
 - prepare test data            [8 hours]
    - non-existent customer id
    - non-existent season id
    - invalid file upload
    - negative amount values
    - duplicate entries


 ## Successes / what went well
  - basic user interface
  - upload .xlsx file through the front-end
  - display uploaded file
  - display computation preview
  - allow user to confirm/approve computed data
  - save uploaded file into the database
  - save computed data
  - compute overides (upload records with specified SeasonIDs)
  - update customer summaries
  - display computed data

 ## Bumps / What you wished went well
  - spent a lot of time figuring out how to expose the data to the backend
  - figuring out the logic for the cascade part took up most of my time
  - better planning and prioritization of the various tasks
  - time management
  - improve my knowledge of data structures and algorithms  ([40hr course on udemy] - it will take me 2 weeks to do this)


 ## Improvements / enhancements to this project for future consideration
  - add user authentication / social logins (gmail)
  - allow the user to make edits after reviewing the processed data
  - allow for json file uploads
  - validate file entry types
  - add single repayment record entry resource
  - allow user to look up customer summary records (to check how much the customer owes and for which season)
  - update repayment records even when payments have been made through mobile money
  - send notifications to customers who have outstanding credits
  