# React Fullscreen Lightbox Basic
Fullscreen Lightbox is plugin for displaying images, videos and more in clean overlaying box.

Website: https://fslightbox.com


| Dependency | Version |
| --- | --- |
| react | at least 16.8.0 |
| react-dom | at least 16.8.0 |
| prop-types | at least 15.6.2 |

## Basic usage

### Installation

```
 npm install --save-dev fslightbox-react
```

### Example

```jsx
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';

function App() {
    // if toggler is updated when lightbox is closed it will open it
    // if toggler is updated when lightbox is opened it will close it
    const [toggler, setToggler] = useState(false);

    return (
        <>
            <button onClick={ () => setToggler(!toggler) }>
                Toggle Lightbox
            </button>
            <FsLightbox
                toggler={ toggler }
                sources={ [
                    'https://i.imgur.com/fsyrScY.jpg',
                    'https://www.youtube.com/watch?v=xshEZzpS4CQ',
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                ] }
            />
        </>
    );
}

export default App;

```

## Demo
Available at: https://fslightbox.com/react

## Documentation and props description
Available at: https://fslightbox.com/react/documentation/basic

## Browser Compatibility

| Browser | Works? |
| --- | --- |
| Chrome | Yes |
| Firefox | Yes |
| Safari | Yes |
| Edge | Yes |
| IE 11 | Yes |

