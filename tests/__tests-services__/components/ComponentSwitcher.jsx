import React, { useState } from 'react';

export default function ComponentSwitcher({ testComponents }) {
    const [currentComponentName, setCurrentComponentName] = useState(null);

    return testComponents.map((TestComponent) => {
        const componentName = TestComponent.name;

        return <div key={componentName}>
            <button id={componentName} onClick={() => setCurrentComponentName(componentName)} />
            {currentComponentName === componentName && <TestComponent />}
        </div>;
    });
}