document.getElementById("login-button").addEventListener("click",() => {
    loadingNav();
    corsRequest("https://almond-dunlin-3705.twil.io/sync-token", reqListener);
    // homeNav();
    // loadDocumentFromNeo(restURL, 'bikes', getBikeFromObject, bikeArray);
    // loadDocumentFromNeo(restURL, 'customers', getCustomerFromObject, customerArray);
    // loadDocumentFromNeo(restURL, 'stores', getStoreFromObject, storeArray);
    // loadDocumentFromNeo(restURL, 'bookings', getBookingFromObject, bookingArray);
    // loadDocumentFromNeo(restURL, 'dates', getDateFromObject, dateArray);
});