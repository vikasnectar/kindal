const nodemailer = require('nodemailer');
const {google} = require('googleapis');

var CLIENT_ID ='422979165603-9h99b163ce65tvvkfbguita9577ksqlb.apps.googleusercontent.com';
var CLIENT_SECRET = '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'
var REDIRECT_URL ='https://developers.google.com/oauthplayground'
var REFRESH_TOKEN ='1//04HunG5Ein-hSCgYIARAAGAQSNwF-L9IrnS8WZqruuKKmSrYpltK5CUwILgp0XBZkDl6tUHrPo_gs2SDRX7mg8KMbcwaxULHVc0Q'

var oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
oAuth2Client.setCredentials({'refresh_token':REFRESH_TOKEN})
let mailer = {}
mailer.sendEmail = async (mailOptions)=>{

     new Promise((resolve,reject)=>{
        try {
            var accessTocken = oAuth2Client.getAccessToken();
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    type:'oAuth2',
                    user:'vikas.kushwah@nectarinfotel.com',
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessTocken:accessTocken
                }
            })
         
          
            var result = transporter.sendMail(mailOptions);
            return resolve(true);
         } catch (error) {
            return reject(false)
              
         }
    })

}

module.exports = mailer