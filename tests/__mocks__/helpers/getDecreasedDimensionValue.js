import { SOURCE_DIMENSIONS_DECREASE_VALUE } from "../../../src/constants/responsiveConstants";

export const getDecreasedDimensionValue = (value) => {
    return (value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE));
};