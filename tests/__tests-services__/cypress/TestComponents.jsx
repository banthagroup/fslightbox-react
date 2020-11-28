import React, { useState } from 'react';
import BaseOpenedLightbox from "../components/BaseOpenedLightbox.jsx";

export default function TestComponents() {
    const testComponents = [
        BaseOpenedLightbox
    ];
    const [currentComponentName, setCurrentComponentName] = useState(null);

    return testComponents.map((TestComponent) => {
        const componentName = TestComponent.name;

        return <div>
            <button id={componentName} onClick={() => setCurrentComponentName(componentName)} />
            {currentComponentName === componentName && <TestComponent />}
        </div>;
    });
}