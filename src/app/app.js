import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes'

injectTapEventPlugin();
render(Routes, document.getElementById('app'));

