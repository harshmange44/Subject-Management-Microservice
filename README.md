# Subject-Management-Microservice
## DEMO
https://subject-mgmt-service.herokuapp.com/

##Languages
### HTML
### CSS
### JavaScript
##Technologies
### Node.Js
### MongoDB
### Express.Js
## Installation
### npm install
## Start Server
### node server.js
## REST APIs
### Create Staff Member: POST /api/staffmembers (Parse info using body-parser)
### Create Subject: POST /api/staffmembers/:username/subjects (Parse info using body-parser)
### Get Subject with queries: GET /api/staffmembers/:_id?[sub_name][&sub_code][&prof_name]
### [ ] = optional & sub_name = subject name sub_code = subject code prof_name = professor name
### i.e./api/staffmembers/harshmange?prof_name=ABCD&sub_code=MAT100

## Output Snapshots
![Homepage.PNG](/Output_Snapshots/Homepage.PNG?raw=true)
![staff_mem_created.PNG](/Output_Snapshots/staff_mem_created.PNG?raw=true)
![staff_auth_not_found.PNG](/Output_Snapshots/staff_auth_not_found.PNG?raw=true)
![staff_auth_found_subject_created.PNG](/Output_Snapshots/staff_auth_found_subject_created.PNG?raw=true)
![get_subject_by_sub_name_&_professor_name.PNG](/Output_Snapshots/get_subject_by_sub_name_&_professor_name.PNG?raw=true)
![get_subject_by_professor_name.PNG](/Output_Snapshots/get_subject_by_professor_name.PNG?raw=true)
![get_subject_by_name.PNG](/Output_Snapshots/get_subject_by_name.PNG?raw=true)
