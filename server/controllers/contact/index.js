const contactModel = require("../../models/contact");
const multer = require("../../utils/multer-config");
const db = require("../../db/db");

exports.getIndex = (req, res) => {
  res.render("contact/index", {
    pageTitle: "TravelAloha - Contact",
    user: req.user
  });
};
exports.getHotelInfo = (req, res) => {
  try {
    res.render("contact/add-new-hotel", {
      pageTitle: "TravelAloha - Contact - Register New Hotel",
      user: req.user
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineInfo = (req, res) => {
  res.render("contact/add-new-airline", {
    pageTitle: "TravelAloha - Contact - Register New Airline",
    user: req.user
  });
};
exports.postHotelInfo = async (req, res) => {
  try {
    multer.upload(req, res, async err => {
      const {
        hotelName,
        hotelEmail,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelDescription,
        hotelRoomType,
        hotelRoomType2,
        hotelRoomType3,
        hotelRoomType4,
        hotelRoomType5,
        hotelRoomType6,
        hotelRoomPrice,
        hotelRoomPrice2,
        hotelRoomPrice3,
        hotelRoomPrice4,
        hotelRoomPrice5,
        hotelRoomPrice6
      } = req.body;
      if (err) {
        res.sendStatus(400)
        return;
      }
      console.log(hotelRoomType)
      const hotelProfile = req.files["hotelProfile"][0].filename;
      const hotelPicture = req.files["hotelPicture"][0].filename;
      // const hotelRoomPicture = req.files["hotelRoomPicture"][0].filename;
      await contactModel.insertNewHotel({
        hotelName,
        hotelDescription,
        hotelAddress,
        hotelTelNumber,
        hotelContactNumber,
        hotelEmail,
        hotelProfile,
        hotelPicture
      });
      if(hotelRoomType == "1 Single-Bed"){
        await contactModel.insertNewHotelRoomType({
          hotelRoomType
        });
        await contactModel.insertNewHotel1SingleBedRoomPrice({
          hotelRoomPrice
        });
      }else if(hotelRoomType2){
        await contactModel.insertNewHotelRoomType2({
          hotelRoomType2
        });
        await contactModel.insertNewHotel2SingleBedRoomPrice({
          hotelRoomPrice2
        });
      }else if(hotelRoomType3){
        await contactModel.insertNewHotelRoomType3({
          hotelRoomType3
        });
        await contactModel.insertNewHotel2SingleBedRoomPrice({
          hotelRoomPrice3
        });
      }else if(hotelRoomType4){
        await contactModel.insertNewHotelRoomType4({
          hotelRoomType4
        });
        await contactModel.insertNewHotel2SingleBedRoomPrice({
          hotelRoomPrice4
        });
      }else if(hotelRoomType5){
        await contactModel.insertNewHotelRoomType5({
          hotelRoomType5
        });
        await contactModel.insertNewHotel1KingBedRoomPrice({
          hotelRoomPrice5
        });
      }else if(hotelRoomType6){
        await contactModel.insertNewHotelRoomType6({
          hotelRoomType6
        });
        await contactModel.insertNewHotel2KingBedRoomPrice({
          hotelRoomPrice6
        });
      }
      // await contactModel.insertNewHotelRoomPicture({
      //   hotelRoomPicture
      // })
    });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  } finally {
    res.redirect("/contact/new-hotel-dashboard");
  }
};
exports.postAirlineInfo = async (req, res) => {
  try {
    multer.upload(req, res, async err => {
      const {
        airlineName,
        airlineNationality,
        airlineEmail,
        airlineDescription,
        airlineAddress,
        airlineTelNumber,
        airlineContactNumber,
        airlinePlaneDes
      } = req.body;
      if (err) {
        res.sendStatus(400);
        return;
      }
      const airlineProfile = req.files["airlineProfile"][0].filename;
      const airlinePicture = req.files["airlinePicture"][0].filename;
      await contactModel.insertNewAirline({
        airlineName,
        airlineNationality,
        airlineEmail,
        airlineDescription,
        airlineAddress,
        airlineTelNumber,
        airlineContactNumber,
        airlinePlaneDes,  
        airlineProfile,
        airlinePicture
      });
    });
  } catch (error) {
    res.sentStatus(400);
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  } finally {
    res.redirect("/contact/new-airline-dashboard");
  }
};
exports.getHotelDashboard = async (req, res) => {
  try {
    let hotelData = await contactModel.getHotelDashboard();
    res.status(200);
    res.render("contact/new-hotel-dashboard", {
      pageTitle: "TravelAloha - Contact - New Hotel Dashboard",
      user: req.user,
      hotel: hotelData
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineDashboard = async (req, res) => {
  try {
    let airlineData = await contactModel.getAirlineDashboard();
    res.status(200);
    res.render("contact/new-airline-dashboard", {
      pageTitle: "TravelAloha - Contact - New Airline Dashboard",
      user: req.user,
      airline: airlineData
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getHotelDetail = async (req, res) => {
  const hotelId = req.body.hotelId;
  try {
    const result = await db.query(`SELECT * FROM hotel WHERE hotelId = '${hotelId}' `);
    const data = JSON.stringify(result[0]);
    res.status(200);
    res.render("contact/new-hotel-detail", {
      pageTitle: "TravelAloha - Contact - New Hotel Detail",
      user: req.user,
      hotel: data
    });
  } catch (err) {
    res.sendStatus(400);
  }
};
exports.getAirlineDetail = async (req, res) => {
  const airline_Id = req.body.airline_Id;
  try {
    const result = await db.query(`SELECT * FROM airline WHERE airline_Id = '${airline_Id}' `);
    const data = JSON.stringify(result[0]);
    res.status(200);
    res.render("contact/new-airline-detail", {
      pageTitle: "TravelAloha - Contact - New Airline Detail",
      user: req.user,
      airline: data
    });
  } catch (err) {
    res.sendStatus(400);
  }
};

