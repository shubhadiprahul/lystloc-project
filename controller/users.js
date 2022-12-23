const csrf = require('csrf-token')
const knex = require('../config/dbconn')

// email validation
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

exports.addData = async(req,res) => {
    console.log(req.body)
    const {name,number,email} = req.body
    if(!name&&!number&&!email) {
        res.json({
            msg: "enter proper data"
        })
        return

    }
    const validateEmail = await ValidateEmail(email)


    console.log(validateEmail)

    if (validateEmail == true) {

        let csrf_token;
        //creating csrf_token
        csrf.create(process.env.csrf_token, (err, token) => {
            if (err) console.error(err)
            else {
                csrf_token = token
            }
          })

        // Checking user already exists or not
        const checkAlreadyUser = await knex('users').where({
            email: email
        })
        if (checkAlreadyUser.length != 0) {
            res.json({
                msg: "User already exists"
            })
        }else{
            // adding data in database
            knex('users').insert({
                name: name,
                email: email,
                number: number,
                csrf_token: csrf_token
            }).then((resp) =>{
                
                console.log(resp)
                res.json({
                    msg: `user data add successfully`
                })
            }).catch((err) =>{
                console.log(err)
                res.json({
                    msg: "Something went wrong"
                })
            })
        } 

    } else{
        res.json({
            msg: "You have entered an invalid email address!"
        })
    }  
    
}

// this api for verify token(csrf_token) 
exports.verifytoken = async(req,res) =>{

    csrf.verify(process.env.csrf_token, req.body.token).then((matches) => {
        if (matches) {
            console.log('Yes!')
            res.json({
                msg:"User verified"
            })
        }
        else {
            console.log('What?!')
            res.json({
                msg:"User not verified"
            })
        }
      })
}
