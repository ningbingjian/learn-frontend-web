const payload = JSON.parse('{"eventId":42,"status":"delivered","attempts":"2"}');

console.log(`event=${payload.eventId.toUpperCase()}`);
