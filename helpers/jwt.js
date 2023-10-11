const expressJwt = require("express-jwt")
const jwt = require('jsonwebtoken')

function userAuth(){
    var flag = isRevoked
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt.expressjwt({ secret, 
        algorithms: ['HS256'],
        isRevoked : flag
        
}).unless({
        path: [`${api}/user/login`,
            {url: /\/api\/v1\/products(.*)/ ,methods : ['GET','OPTIONS'] },
            {url:/\/api\/v1\/category(.*)/ ,methods : ['GET'] },
            
        ]
    })
}

async function isRevoked(req,payload,done){
    console.log(payload)
    if (payload.isAdmin) {
        console.log(payload)
        return done(null,false)
    }
    return done(true)
}

module.exports = userAuth;