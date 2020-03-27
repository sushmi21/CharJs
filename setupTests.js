import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, render, mount } from 'enzyme';

global.React = React;
global.mount = mount;
global.render = render;
global.shallow = shallow;
