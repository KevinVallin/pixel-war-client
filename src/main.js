import { createApp } from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-3-socket.io';
import SocketIO from 'socket.io-client'

const app = createApp(App)
const socketConnection = SocketIO('http://localhost:3000');

console.log({app})
app.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
 /* vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },*/
}))

app.mount('#app')



