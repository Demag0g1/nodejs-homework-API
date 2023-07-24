const authLogin= require ("./auth/userLoginController.js")
const authRegistration= require ("./auth/userRegistrationController.js")
const contactController= require ("./contact/contactController.js")
const contactManagement= require ("./contact/contactsManagementController.js")


module.exports={authLogin, authRegistration, contactController, contactManagement  }
