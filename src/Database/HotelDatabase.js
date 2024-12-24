import React, { Component, useState } from "react";
import firebase from "../firebase.js";

class HotelDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: [],
    };
    this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
  }
  getMessagesFromDatabase() {
    let ref = firebase.database().ref("Hotels");
    ref.on("value", (snapshot) => {
      let msgData = snapshot.val();
      let newMessageFromDB = [];
      for (let m in msgData) {
        let currentObject = {
          HotelsID: msgData[m].HotelsID,
          Name: msgData[m].HotelsID.Name,
          Country: msgData[m].HotelsID.Country,
          Position: msgData[m].HotelsID.Position,
          HotelsType: msgData[m].HotelsID.HotelsType,
          Price: msgData[m].HotelsID.Price,
          StartTime: msgData[m].HotelsID.StartTime,
          EndTime: msgData[m].HotelsID.EndTime,
          Picture: msgData[m].HotelsID.Picture,
        };
        newMessageFromDB.push(currentObject);
      }
      this.setState({ dbData: newMessageFromDB });
    });
  }
}
export default HotelDatabase;
