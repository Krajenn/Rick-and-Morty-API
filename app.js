import { renderCharacters } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

if (window.location.search.includes("?id=")) {
    renderDetail();
} else {
    renderCharacters();
}
