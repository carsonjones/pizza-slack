// routes/api.js
var pizza = require('../helpers/dominos.js'),
    Q = require('q');

var defaultAddress = 'Dallas, TX, 75201';
// pizza.getStores(address);

module.exports = function(router) {
  'use strict';
  router.route('/')
  .post(function(req, res, next) {
    var command = req.body.command,
        text = req.body.text;

    if(!text){
      res.json({ message: 'Ya gotta say something! Try /pizza help for assistance.'});
    }

    if(text == 'test'){
      res.status(200).send('it\'s aliveeeee');
    }

    // console.log(text.substring(0,6));
    // Get what the user is trying to do and help them out
    if(text.substring(0,6) == 'stores'){
      var address = text.replace('stores','');
      console.log(address);
      pizza.getStores(address)
      .then(function(storeData){
        var returnData = {};
        returnData.response_type  = 'in_channel';
        returnData.username = "Pizza";
        var store = {
          name: storeData.result.Stores[0].StoreID,
          canDeliver: storeData.result.Stores[0].AllowDeliveryOrders,
          open: storeData.result.Stores[0].ServiceIsOpen.Delivery,
          address: storeData.result.Stores[0].AddressDescription,
          deliverHours: storeData.result.Stores[0].ServiceHoursDescription.Delivery,
          phone: storeData.result.Stores[0].Phone
        }
        returnData.text = 'I found 1 store close to you:';
        var name = store.name;
        var text = 'Address:\n ' + store.address + '\nDelivery?:\n' + store.canDeliver + '\nIs it open?:\n' + store.open + '\nPhone Number:\n' + store.phone;
        returnData.attachments = [{"title":name, "text":text }];
        res.status(200).send(returnData);
      });
    }

    // res.json({ message: 'Pizza pizza'});
  })
  .get(function(req, res, next){
    pizza.getStores(defaultAddress)
    .then(function(storeData){
      var returnData = {};
      returnData.response_type  = 'in_channel';
      returnData.username = "Pizza";
      var store = {
        name: storeData.result.Stores[0].StoreID,
        canDeliver: storeData.result.Stores[0].AllowDeliveryOrders,
        open: storeData.result.Stores[0].ServiceIsOpen.Delivery,
        address: storeData.result.Stores[0].AddressDescription,
        deliverHours: storeData.result.Stores[0].ServiceHoursDescription.Delivery,
        phone: storeData.result.Stores[0].Phone
      }
      returnData.text = 'I found 1 store close to you:';
      var name = store.name;
      var text = 'Address:\n ' + store.address + '\nDelivery?:\n' + store.canDeliver + '\nIs it open?:\n' + store.open + '\nPhone Number:\n' + store.phone;
      returnData.attachments = [{"title":name, "text":text }];
      console.log(returnData);
      // res.send(returnData);

      // for(var i=0; i < storeData.result.Stores.length; i++){
      //   var store = {
      //     name: storeData.result.Stores[i].StoreID,
      //     canDeliver: storeData.result.Stores[i].AllowDeliveryOrders,
      //     open: storeData.result.Stores[i].ServiceIsOpen.Delivery,
      //     address: storeData.result.Stores[i].AddressDescription,
      //     deliverHours: storeData.result.Stores[i].ServiceHoursDescription.Delivery,
      //     phone: storeData.result.Stores[i].Phone
      //   }
      //   returnData.attachments = [store];
      //   console.log(store);
      // }
    });
    res.json({ message: 'Pizza pizza'});
  });
};
