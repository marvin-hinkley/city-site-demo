import { firebaseApp } from "~/firebase";
import flamelink from 'flamelink';

export default flamelink({
    firebaseApp,
    env: 'development',
    locale: 'en-US',
    dbType: 'cf'
});

