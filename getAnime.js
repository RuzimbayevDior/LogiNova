const AnimeSchema = require("./Schema/anime.schema");
const jwt = require("jsonwebtoken");
const BaseError = require("./utils/error");
require('dotenv').config();
const path = require('path')






const getAnime = async (req, res,next) => {
    try {
      const { id } = req.params
      const anime = await AnimeSchema.findById(id);
      if (!anime) {
        throw BaseError.BadRequest("Anime not found");
      }
      const { name ,  trailer, bannerImg, animeFotoImg } = anime
  
      const b = name.replace(/\s+/g, '')
  
  
      const filePath = path.join(__dirname,`uploads/${b}`, trailer);
  
  
  
  
  
  
  
  
      res.sendFile(filePath, (err) => {console.log(err);
        })
    } catch (error) {
      next(error)
    }
  }
  

  module.exports = getAnime
  