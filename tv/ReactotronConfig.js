import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'Nutzflix TV', host: '10.0.0.15' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default Reactotron;
