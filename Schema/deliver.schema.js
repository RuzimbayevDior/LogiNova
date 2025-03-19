const { Schema, model } = require("mongoose");

const DriverSchema = new Schema(
  {
   first_name : {
    type : String,
    required : true,
   },
   last_name : {
    type : String,
    required : true,
   },
   surname : {
    type : String,
    required : true,
   },
   birth_day : {
    type : Date,
    required : true,
   },
   passport : {
    type : String,
    required : true,
   },
   phone : {
    type : Number,
    required : true,
   },
   driver_license : {
    type : String,
    required : true,
   },
   experience : {
    type : String,
    required : true,
   },
   password : {
    type : String,
    required : true,
   },



   car_name : {
    type : String,
    required : true,
   },
   car_type : {
    type : String,
    required : true,
   },
   car_weight : {
    type : String,
    required : true,
   },
   car_capacity : {
    type : String,
    required : true,
   },
   ownership_document : {
    type : String,
    required : true,
   },
   is_verify : {
    type : Boolean,
    default : false,
   }


  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("driver", DriverSchema);
