// import modal
const db = require('./db')

// login logic
alogin = (aid, apsw) => {
    return db.Admin.findOne({ aid, apsw }).then(admin => {
        if (admin) {
            return {
                message: "Login successfull",
                status: true,
                statusCode: 200

            }
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
// add event
addevent = (eid,
    cid,
    ename,
    desc,
    price,
    is_available,
    eimage,
    venue,
    organizer,
    date,
    time,
) => {
    return db.Event.findOne({id:eid}).then(event=>{
        if(event){
            return{
                message: "Event already registered",
                status: false,
                statusCode: 404
         
            }
        }
        else{
            const newEvent = new db.Event({
                id: eid,
                categoryId: cid,
                eventName: ename,
                description: desc,
                price: price,
                is_available: is_available,
                eventImage: eimage,
                venue: venue,
                organizer: organizer,
                date:date,
                time:time
            
            })
            return newEvent.save().then(()=>{
                return{
                    message: "Event scheduled successfully",
                    status: true,
                    statusCode: 200
        
                }
            })
        }
    })
}
module.exports = {
    alogin,addevent
}