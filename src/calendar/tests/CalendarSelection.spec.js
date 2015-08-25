import React from 'react/addons';
import CalendarSelection from '../CalendarSelection.jsx';

const TestUtils = React.addons.TestUtils;

describe('The CalendarSelection Component', function () {
  beforeEach(() => {
    this.spyCx = spyOn(CalendarSelection.prototype.__reactAutoBindMap, 'cx').and.returnValue('my-class');

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CalendarSelection pending={true} modifier='test'/>);
    this.renderedComponent = shallowRenderer.getRenderOutput();
  });

  it('should render the right element', () => {
    expect(this.renderedComponent.type).toBe('div');
    expect(this.spyCx).toHaveBeenCalledWith({
      states: {
        pending: true,
      },
      modifiers: {
        test: true,
      },
    });
    expect(this.renderedComponent.props.className).toEqual('my-class');
  });
});
