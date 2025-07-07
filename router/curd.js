const employeeSchema = require("../controller/middleware/EmployeeSchema")

async function getFun(req , res){

  let getData = await employeeSchema.find()

  res.json({getData})
}



module.exports = {getFun}
