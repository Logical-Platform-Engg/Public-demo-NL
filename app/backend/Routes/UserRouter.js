const express= require('express');
const Router=express.Router();
const dataService=require('../Services/dataService');

Router.get('/getdata', dataService.getData);
// Router.post('/insert', dataService.insert);
Router.post('/terraform', dataService.terraformrun)
Router.post('/tfdestroy', dataService.tfdestroy)

module.exports=Router;