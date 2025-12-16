// In ES Modules:
// export default cannot be used directly with const, let, or var
// export default must export a value, not a declaration
//So, export default const db=()->{...} invalid
// OPTION 1: export default function db(){...} use fun instead
// OPTION 2: USE NAMED EXPORT (const db=(...){})
// OPTION 3: MOST COMMON: declare(first) and export(last)
//const db=(...){} 
//export default db
import mongoose from "mongoose"
const dbConnect = async (mongoURL, dbName) => {
    try {
        const dbURL = `${mongoURL}${dbName}`
        const res = await mongoose.connect(dbURL)
        console.log("DB CONNECTED SUCCESSFULLY")
    }
    catch (e) {
        console.log("DB ERROR:", e)
    }


}

export default dbConnect