import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'Nutzflix TV', host: '10.0.0.15' })
  .useReactNative({ networking: false }) // stop copying API response bodies (incl. the whole catalog) over the socket
  .use(
    reactotronRedux({
      except: [
        'video/setVideos',
        'video/get_videos/fulfilled',
        'user/auth/fulfilled',
        'persist/REHYDRATE',
      ],
    }),
  )
  .connect();

export default Reactotron;
