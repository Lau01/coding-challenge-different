# Rental Payments Different Coding Challenge
A coding challenge from the company ':Different'. Created using `create-react-app`.

### Instructions
1. In the command line interface, inside the directory, run `npm start`.
It should take you to [http://localhost:3000/#/](http://localhost:3000/#/).
![Tenant Page](https://github.com/Lau01/coding-challenge-different/raw/master/public/tenant-page.png "Image")

2. Click the tenants to view their lease info
![Lease Info Page](https://github.com/Lau01/coding-challenge-different/raw/master/public/lease-info.png "Image")

3. Alternatively, you can search a particular lease by its ID by typing in the url:
[http://localhost:3000/#/lease/:id](http://localhost:3000/#/lease/:id) where `:id` is the particular lease ID you want to browse.

### Code overview
* All the logic for the lease column data (From, To, Days, Amount) can be found in their respective files in the `/lib` folder.
* `util.js` contains utility functions to help manipulate dates and other small helper functions.

### Installed Dependencies
```
axios
react-router-dom
react-spinners
```
