"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const audic_1 = require("audic");
const audic = new audic_1.default('audio.mp3');
await audic.play();
audic.addEventListener('ended', () => {
    audic.destroy();
});
//# sourceMappingURL=index.js.map