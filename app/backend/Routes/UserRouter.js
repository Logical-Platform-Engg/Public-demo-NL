const express= require('express');
const Router=express.Router();
const dataService=require('../Services/dataService');

Router.post('/getData', dataService.getData);
Router.post('/insert', dataService.insert);

module.exports=Router;