import { documentElementClassList } from "./documentElementClassList";
import { FSLIGHTBOX_OPEN_CLASS_NAME } from "../../../constants/cssConstants";

export function addOpenClassToDocumentElement() {
    documentElementClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
}