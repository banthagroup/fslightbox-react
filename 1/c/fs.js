export function fs({
	componentsServices: {
		toolbarButtons: { fullscreen: isFullscreenOpenState },
	},
	fs: self
}) {
	var FS_CHANGE_EVENTS_NAMES = [
		"fullscreenchange",
		"webkitfullscreenchange",
		"mozfullscreenchange",
		"MSFullscreenChange"
	];

	self.enterFullscreen = () => {
		isFullscreenOpenState.set(true);

		const documentElement = document.documentElement;
		if (documentElement.requestFullscreen) {
			documentElement.requestFullscreen();
		} else if (documentElement.mozRequestFullScreen) {
			documentElement.mozRequestFullScreen();
		} else if (documentElement.webkitRequestFullscreen) {
			documentElement.webkitRequestFullscreen();
		} else if (documentElement.msRequestFullscreen) {
			documentElement.msRequestFullscreen();
		}
	};

	self.exitFullscreen = () => {
		isFullscreenOpenState.set(false);

		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	};
	
	self.toggleFullscreen = function () {
		isFullscreenOpenState.get()
			? self.exitFullscreen()
			: self.enterFullscreen();
	}

	self.listen = function () {
		manage_listen("addEventListener");
	}

	self.unlisten = function () {
		manage_listen("removeEventListener");
	}

	function manage_listen (listen_method_name) {
		for (var i = 0; i < FS_CHANGE_EVENTS_NAMES.length; i++) {
			document[listen_method_name](
				FS_CHANGE_EVENTS_NAMES[i],
				fs_change_listener
			);
		}
	}

	function fs_change_listener () {
        	isFullscreenOpenState.set(
			document.fullscreenElement
			|| document.webkitIsFullScreen
			|| document.mozFullScreen
			|| document.msFullscreenElement
		);
	}
}
