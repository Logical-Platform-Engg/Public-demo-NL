const axios = require("axios");
const dataMachine = require("../Models/dataModel");

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

const getData = async (req,res)=>{
    console.log("Inside getData");
    try {
        const machines = await dataMachine.find({});
        if(machines){
            res.status(200).json(machines);
        } else {
            res.status(204).send();
        }
    } catch(er){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    insert,
    getData
};