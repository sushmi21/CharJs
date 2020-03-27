import App from '../app';

describe('App', () => {
  const wrapper = shallow(<App />);
  it('application renders correctly', () => {
    expect(wrapper).not.toBeNull();
  });
});
