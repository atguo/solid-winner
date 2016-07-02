import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './page/home';

injectTapEventPlugin();
render(<Home />, document.getElementById('app'));
