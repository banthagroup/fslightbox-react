export function LightboxUpdateActioner(o){var{componentsServices:{isLightboxOpenManager},core:{lightboxCloser,slideIndexChanger},stageIndexes}=o;this.runTogglerUpdateActions=()=>{if(isLightboxOpenManager.get()){lightboxCloser.closeLightbox();}else if(o.ii){o.o()}else{o.i()}};this.runCurrentStageIndexUpdateActionsFor=(newSlideSourceIndex)=>{if(newSlideSourceIndex===stageIndexes.current){return;}(isLightboxOpenManager.get())?slideIndexChanger.jumpTo(newSlideSourceIndex):stageIndexes.current=newSlideSourceIndex;};}
