// const Event = use('Event')
// const Pusher = require('pusher')
// const Env = use('Env')

// let pusher = new Pusher({
//         appId: Env.get('PUSHER_APP_ID', ''),
//         key: Env.get('PUSHER_KEY', ''),
//         secret: Env.get('PUSHER_SECRET', ''),
//         cluster: Env.get('PUSHER_CLUSTER'),
//         encrypted: true
// });

// Event.when('send::notification', async (message) => {
   
//     pusher.trigger('inspectacy-development', 'message', {
//       message
//     })
//   })
