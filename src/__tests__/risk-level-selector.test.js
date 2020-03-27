import RiskLevelSelector from '../risk-level-selector';

describe('RiskLevelSelector', () => {
  const onChangeRiskLevel = jest.fn();
  let wrapper = shallow(
    <RiskLevelSelector onChangeRiskLevel={onChangeRiskLevel} />
  );

  it('changes the value on selection', () => {
    expect(onChangeRiskLevel).toBeCalledTimes(0);
    wrapper.find('select').simulate('change', { target: { value: 5 } });
    expect(onChangeRiskLevel).toBeCalledTimes(1);
    expect(onChangeRiskLevel).toHaveBeenCalledWith(5);
  });
});
