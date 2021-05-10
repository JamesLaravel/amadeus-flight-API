const  Amadeus = require('amadeus');

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
        child: '1'
    }).then(function(response){
        
    
      return res.status(200).json({status: 'Success', data: response.data[0]})
    }).catch(function(error){
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