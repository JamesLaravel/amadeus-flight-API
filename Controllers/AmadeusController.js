const  Amadeus = require('amadeus');
const { TokenExpiredError } = require('jsonwebtoken');
const client = require('../helpers/_redis');

const amadeus = new Amadeus({
    clientId : process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_SECRET
})

exports.getflightOffers = async(req, res, next) => {

//const {originLocationCode, destinationLocationCode, departureDate, adults} = req.body;
amadeus.shopping.flightOffersSearch.get({   
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2021-08-01',
        adults: '1',
    }).then(function(response){

        const api_response = response.data.map(item => {
            item.price = item.price.total * 100
            return item;
        })

      return res.status(200).json({status: 'Success', data: api_response})
    }).catch(function(error){
        console.log(error)
        error.status = 400;
        //reject(new Error(error.body))
        next(error)
    });

}


exports.flightPrice = async(req, res, next) => {

    return amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
            'type': 'flight-offers-pricing',
            'flightOffers': [response.data[0]]
            }
        })
        )
}

exports.bookflight = async(req, res, next) => {


}