import React from "react";
import { shallow } from "enzyme";
import Svg from "../../../../src/components/Helpers/Svg";

const svg = shallow(<Svg
    viewBox={ '0 0 20 20' }
    size={ '26px' }
    d={ 'M142' }
/>);

describe('Svg DOM', () => {
    it('should match snapshot', () => {
        expect(svg).toMatchSnapshot();
    });
});