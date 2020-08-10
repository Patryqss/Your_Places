//a function that provides coordinates for given address
export const geocode = (address, google) =>
    new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          let locationString = `${results[0].geometry.location}`;
          let lat = Number(locationString.substring(1, locationString.indexOf(',')));
          let lng = Number(locationString.substring(locationString.indexOf(',') + 2, locationString.length - 1));
          let newLoc = { lat: lat, lng: lng, address: address };
          resolve(newLoc);
        } else {
          reject('One or more of your addresses were invalid.');
        }
      });
    });