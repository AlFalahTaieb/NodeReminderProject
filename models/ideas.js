const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creation du Schéma

const IdeaSchema = new Schema({
title:{
	type:String,
	required:true
},
details:{
	type:String,
	required:true
},
user:{
	type:String,
	require:true
},
date:{
	type:Date,
	default:Date.now //par Défaut
}
});

mongoose.model('ideas',IdeaSchema)