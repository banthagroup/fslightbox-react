# React Fullscreen Lightbox Basic

## Description
A React component for displaying images, videos, or, through custom sources, anything you want in a clean overlying box.
The project's website: https://fslightbox.com.

| Dependency | Version |
| --- | --- |
| react | at least 16.8.0 |
| react-dom | at least 16.8.0 |

## Installation
### Through a package manager
```
npm install fslightbox-react
```
### Or, through an archive downloaded from the website
The .tgz archive, in its entirety, should be put somewhere in the end project, for example, "./src/lib". Then run the package manager's install command with the path to that archive. The command have to be run from the directory where your project's "package.json" file is.
``` 
$ npm install ./src/lib/[lightbox archive name] 
```
For example:
``` 
$ npm install ./src/lib/fslightbox-react-1.0.0.tgz
```

## Basic usage 
```jsx
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

function App() {
	// To open the lightbox change the value of the "toggler" prop.
	const [toggler, setToggler] = useState(false);

	return (
		<>
			<button onClick={() => setToggler(!toggler)}>
				Open the lightbox.
			</button>
			<FsLightbox
				toggler={toggler}
				sources={[
					'https://i.imgur.com/fsyrScY.jpg',
					'https://www.youtube.com/watch?v=xshEZzpS4CQ',
					'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
				]}
			/>
		</>
	);
}

export default App;
```

## Documentation
Available at: https://fslightbox.com/react/documentation.

## Browser Compatibility
| Browser | Works? |
| --- | --- |
| Chrome | Yes |
| Firefox | Yes |
| Safari | Yes |
| Edge | Yes |
| IE 11 | Yes |
