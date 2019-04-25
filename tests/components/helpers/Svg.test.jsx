import React from "react";
import { shallow } from "enzyme/build";
import Svg from "../../../src/components/helpers/Svg";

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