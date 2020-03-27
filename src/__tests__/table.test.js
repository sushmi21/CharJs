import Table from '../table';

describe('Table', () => {
  let wrapper;

  beforeEach(() => {
    const cones = [{ riskLevel: 5, mu: 0.0283, sigma: 0.028 }];
    wrapper = mount(<Table riskLevel={5} initialSum={500} cones={cones} />);
  });

  it('table renders properly', () => {
    expect(wrapper).not.toBeNull();
  });

  it('risk level prop received', () => {
    expect(wrapper.prop('riskLevel')).toBeGreaterThanOrEqual(3);
    expect(wrapper.prop('riskLevel')).toBeLessThanOrEqual(25);
    expect(wrapper.prop('riskLevel')).toBe(5);
  });

  it('cones prop received', () => {
    expect(wrapper.prop('initialSum')).not.toBeNull();
  });

  it('initial sum prop received', () => {
    expect(wrapper.prop('initialSum')).toBe(500);
  });
});
