/**
 * @class
 */
export function LightboxOpeningActions(
    {
        setters: { setState },
        core: {
            globalResizingController: { runAllResizingActions },
            eventsControllers: {
                window: {
                    resize: {
                        attachListener: attachResizeListener
                    },
                    swiping: {
                        attachListeners: attachSwipingListeners,
                    }
                }
            },
            sourceHoldersTransformer: {
                transformStageSourceHolders
            }
        },
    }
) {
    this.runActions = ()  => {
        setState({
            isOpen: true,
        }, () => {
            componentMountedAfterOpen();
        });
    };

    const componentMountedAfterOpen = () => {
        attachResizeListener();
        attachSwipingListeners();
        runAllResizingActions();
        transformStageSourceHolders().withoutTimeout();
    };
}