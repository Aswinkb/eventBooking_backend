// import modal
const db = require('./db')

// register logic
register = (uname, email, mobno, upsw) => {
  return db.User.findOne({ email }).then(user => {
    if (user) {
      return {
        message: "Email already registered",
        status: false,
        statusCode: 404
      }
    }
    else {
      //       db.User.sort((a,b)=>a.id-b.id).then(lastUser=>{
      //         newId = 1
      //         if(lastUser){
      //           newId += lastUser.id
      //         }
      //       })
      //       newUser = new db.User({
      //         id:newId,
      //         uname,
      //         email,
      //         mobile: mobno,
      //         psw: upsw,
      //         history: []

      //       })
      //       newUser.save() //save changes in database
      //       return {
      //         message: "Registered successfully",
      //         status: true,
      //         statusCode: 200
      //       }
      //     }
      //   })
      // }
      return db.User.findOne().sort({ id: -1 }).then(lastUser => {
        let newId = 1;
        if (lastUser) {
          newId = lastUser.id + 1;
        }

        const newUser = new db.User({
          id: newId,
          uname,
          email,
          mobile: mobno,
          password: upsw,
          history: []
        });

        return newUser.save().then(() => {
          return {
            message: "Registered successfully",
            status: true,
            statusCode: 200
          };
        });
      });
    }
  });
};
// login logic
login = (email, upsw) => {
  return db.User.findOne({ email, password: upsw }).then(user => {
    if (user) {
      return {
        message: "Login successfull",
        status: true,
        statusCode: 200,
        currentId: user.id,
        currentUser: user.uname,
        currentEmail: email

      };

    }
    else {
      return {
        message: "Something wrong with email/password",
        status: false,
        statusCode: 404
      };

    }
  })
}
// getuser logic
getuser = (currentId) => {
  return db.User.findOne({ id: currentId }).then(user => {
    if (user) {
      return {
        message: user,
        status: true,
        statusCode: 200

      }
    }
    else {
      return {
        message: "User not found",
        status: false,
        statusCode: 404
      }
    }
  })
}
// update user
updateUser = (uid, udata) => {
  return db.User.findOne({ id:uid }).then(user => {
    if (user) {
      // Update user data
      user.uname = udata.uname ;
      user.email = udata.email ;
      user.mobile = udata.mobile; 
      user.password = udata.password ;

      return user.save().then(() => {
        return {
          message: "User data updated successfully",
          status: true,
          statusCode: 200
        };
      });
    } else {
      return {
        message: "User not found",
        status: false,
        statusCode: 404
      };
    }
  });
};
// logic to view events
getEvents=()=>{
  return db.Event.find({}).then(result=>{
    if(result){
      return{
        message: result,
        status: true,
        statusCode: 200

      }
    }
    else{
      return{
        message: "No Events to show",
        status: false,
        statusCode: 404

      }
    }
  })
}

// logic to get single event
viewEvent=(eid)=>{
  return db.Event.find({id:eid}).then(event=>{
    if(event){
      return{
        message: event,
        status: true,
        statusCode: 200
      }
    }
    else{
      return{
        message: "No Events to show",
        status: false,
        statusCode: 404

      }

    }
  })
}
// logic to book event
booknow=(uid,edata)=>{
  return db.User.findOne({id:uid}).then(user=>{
    if(user){
      user.history.push(edata)
      user.save()
      return{
        message:"Booked successfully",
        status: true,
        statusCode: 200
      }

    }
    else{
      return{
        message: "Unable to book",
        status: false,
        statusCode: 404
      }
 
    }
  })
}

// export
module.exports = {
  register, login,getuser,updateUser,getEvents,viewEvent,booknow
}
