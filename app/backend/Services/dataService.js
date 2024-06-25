const axios = require("axios");
const dataMachine = require("../Models/dataModel");
const runCommand = require("../functions/feature");

const insert = async (req, res) => {
  let { owner, instance_name, region, zone, config } = req.body;
  
  console.log(req.body);
  try {
    console.log("Inside try");
    const newMachine = new dataMachine({
      owner,
      instance_name,
      region,
      zone,
      config,
    });
    console.log("Inside try2");
    await newMachine.save().then((data) => {
      res.status(200).json({
        status: 200,
        message: "Data Saved Successfully !!",
      });
    });
  } catch (er) {
    res.json({
      status: 400,
      message: er,
    });
  }
};

const getData = async (req, res) => {
  console.log("Inside getData");
  try {
      const machines = await dataMachine.find({ active: true });
      console.log(machines)
      if (machines.length > 0) {
          res.status(200).json(machines);
      } else {
          res.status(204).send();
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteData = async (req,res)=>{
  let { _id } = req.body;
  console.log("Inside deleteData");
  console.log(_id);
  try {
    console.log("Inside delete try");
    const result = await dataMachine.findByIdAndDelete(_id);
    if(result){
        res.status(200).json({
          status:200,
          message: "Data Deleted Successfully !!",
        });
    } else {
      res.status(404).json({
        status: 404,
        message: "Data not found !!",
      });
    }
} catch(er){
  console.error("Error deleting data:", error);
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: error.message,
  });
}
}

const terraformrun = async (req, res)=> {
  try {
    console.log(req.body);

    // Run terraform init
    process.env.TF_VAR_terraform_data = JSON.stringify(req.body);

    const machine_before_creation = new dataMachine({
      owner: req.body.owner,
      instance_name: req.body.name,
      zone: req.body.zone,
      machine_type: req.body.machine_type,
    });

    await machine_before_creation.save();

    await runCommand('terraform', ['init']);

    // Run terraform plan
    await runCommand('terraform', ['plan']);

    // Run terraform apply
    const applyResult = await runCommand('terraform', ['apply', '--auto-approve']);

        // Check if apply was successful
        if (applyResult.success) {
            // Update active status in MongoDB
            await machine_before_creation.updateOne({ active: true });

            res.json({ message: 'Terraform apply successful' });
        } else {
            res.status(500).json({ error: 'Terraform apply failed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

const tfdestroy = async (req, res)=> {
  console.log("Inside tfdestroy");
  try {
    // Run terraform init
    process.env.TF_VAR_terraform_data = JSON.stringify(req.body);

    
    // await runCommand('terraform', ['init']);

    // Run terraform plan
    // await runCommand('terraform', ['plan']);

    // Run terraform apply
    const applyResult = await runCommand('terraform', ['destroy', '--auto-approve']);

        // Check if apply was successful
        if (applyResult.success) {
            // Update active status in MongoDB
            // await machine_before_creation.updateOne({ _id: machine_before_creation._id }, { active: true });
            await dataMachine.updateMany({}, { active: false });
            res.json({ message: 'Terraform destroy successful' });
        } else {
            res.status(500).json({ error: 'Terraform destroy failed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    insert,
    getData,
    deleteData,
    terraformrun,
    tfdestroy
};