# TODO: Fix Invalid Data Display in MyTrips Page

## Issue Summary

- BookingDate fields are stored as strings in "dd/mm/yyyy" format, causing "Invalid Date" in frontend.
- Total amounts may show as NaN if not numeric strings.

## Steps to Fix

- [x] Update plansSchema.js: Change BookingDate to Date type, totalamount to Number.
- [x] Update tripSchema.js: Change BookingDate to Date type, totalamount to Number.
- [x] Update Server.js: In /userplan and /userbooking routes, set BookingDate to new Date(), ensure totalamount is Number.
- [x] Update Server.js: In /createtrip route, ensure plans have BookingDate as Date.
- [x] Update MyTrips.jsx: Ensure parseDate handles Date objects correctly (already does via new Date()).
- [x] Test the changes by running the app and checking /mytrips page.
- [x] Fix date parsing in server routes to handle DD/MM/YYYY format.
- [x] Update frontend parseDate to handle DD/MM/YYYY format as fallback.
