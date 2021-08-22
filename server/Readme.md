### Access

Access the website at `http://40.70.244.158:3001/`
Admin login username: _admin_
Admin login password: _test123_

### Approach

**Server**

1. Create two entities: patients and admin and used MongoDB to store them. They are available in `src/model`
2. Create 2 APIs for patients: 1) RegisterPatient 2) GetAllPatients. The route of the api is defined in `src/router` and logic for them is defined in `src/controller`.
3. Create 2 APIs for admin: 1) AddAdmin (for creating a new admin account) 2) Admin Login
4. The images will be uploaded locally to the server in a folder call `uploads`

**Client**

1. There are 3 pages 1) Register Patient (also the home page for now) 2) Admin Login 3) List all Patients
2. The code for all the pages are in `src/pages`.
3. There are 2 main components 1) Table 2) TopBar which are defined in `src/components`
4. All the custom css is defined in `index.css`
5. Uses `react-table` to render the table which is providing sorting capability, `react-toastify` to show the alerts and `react-bootstrap` for the main css.

### Assumptions

1. Currently, Images are uploaded in local space on the server. In a production version, will ideally upload it to S3 or any other service and serves the files from there.
2. There are no validations in the API. Ideally will use some validation middlelayer before processing the data in the API.
3. The ListPatients API is not checking for any authentication. Ideally in a production version, it will check for authentication of the user before processing.
4. The ListPatients Page is not behind a PrivateRoute and one can easily access it through the url `/patient/list`. I have not put it behind the private route I made the assumption that it is not asked in this assessment.
5. The validation in the register patient form is for name, email and license image.
6. Not showing the address and license image in the list patients page as I was not sure if that was asked in the requirements. If required, I can easily put that in a separate page to show it to the admins.
7. Not put enough documentation, logging or exception handling as the assumption is that for this assessment, this project doesn't have to be production grade code.
