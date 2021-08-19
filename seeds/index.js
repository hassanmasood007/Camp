const mongoose = require ('mongoose')
const path = require('path');
const {places,descriptors} = require ('./seedHelpers');
const cities = require ('./cities');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DataBase Connected");
});


const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i =0 ; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6096813f6591251f284e0a80',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, nesciunt voluptatem quis est beatae libero officia consequuntur ducimus. Iure quas temporibus beatae et fugit quod ipsam nesciunt quasi consectetur natus.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
    
}

seedDB();