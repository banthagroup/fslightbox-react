# React Fullscreen Lightbox Basic
## Version - 0.9.1
## Description

In development

Fullscreen Lightbox is plugin for displaying images and videos in clean overlaying box.

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

```
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';

function App() {
    const [toggler, setToggler] = useState(false);

    return (
        <>
            <button onClick={ () => setToggler(!toggler) }>
                Toggle Lightbox
            </button>
            <FsLightbox
                toggler={ toggler }
                urls={ [
                    'https://i.imgur.com/fsyrScY.jpg',
                    'https://www.youtube.com/watch?v=xshEZzpS4CQ',
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                ] }
            />
        </>
    );
}

export default App;

```

## Browser Compatibility

| Browser | Works? |
| --- | --- |
| Chrome | Yes |
| Firefox | Yes |
| Safari | Yes |
| Edge | Yes |
| IE 11 | Yes |

