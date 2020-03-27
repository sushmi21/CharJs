import InitialSumInput from '../initial-sum-input';

describe('InitialSumInput', () => {
  const onInitialSumChange = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <InitialSumInput onInitialSumChange={onInitialSumChange} />
    );
  });
  it('default initial sum', () => {
    expect(wrapper.find('input').text()).toEqual('');
  });
  it('on changing input value of sum', () => {
    wrapper.find('input').simulate('change', { target: { value: 5000 } });
    expect(onInitialSumChange).toHaveBeenCalledTimes(1);
    expect(onInitialSumChange).toHaveBeenCalledWith(5000);
  });
});
