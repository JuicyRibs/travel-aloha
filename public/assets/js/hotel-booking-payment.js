var inputFirstName = $('#input-first-name').val();
var inputLastName = $('#input-last-name').val();
var inputEmail = $('#input-email').val();
var inputPhoneNo = $('#input-phone-no').val();
var checkInDate = $('#check-in-date').val();
var checkOutDate = $('#check-out-date').val();
var hotelID = $('#hotel-id').val();
var roomID = $('#room-id').val();
var hotelFullPrice = $('#hotel-full-price').val();
var hotelSalePrice = $('#hotel-sale-price').val();

localStorage.setItem("inputFirstName", inputFirstName);
localStorage.setItem("inputLastName", inputLastName);
localStorage.setItem("inputEmail", inputEmail);
localStorage.setItem("inputPhoneNo", inputPhoneNo);
localStorage.setItem("checkInDate", checkInDate);
localStorage.setItem("checkOutDate", checkOutDate);
localStorage.setItem("hotelID", hotelID);
localStorage.setItem("roomID", roomID);
localStorage.setItem("hotelFullPrice", hotelFullPrice);
localStorage.setItem("hotelSalePrice", hotelSalePrice);