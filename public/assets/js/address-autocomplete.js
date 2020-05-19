/* eslint-disable no-unused-vars */

var autocomplete;

function fillInAddress() {
  autocomplete.getPlace();
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("address-input")
  );
  autocomplete.addListener("place_changed", fillInAddress);
}
