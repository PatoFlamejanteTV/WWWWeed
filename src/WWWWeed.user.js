// ==UserScript==
// @name         WWWWeed
// @namespace    https://github.com/PatoFlamejanteTV
// @version      1.3
// @description  Web drugs, DOM effects and CSS spamming.
// @license      MIT
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // YOU CAN EDIT THESE VALUES:

    // Set the maximum values for animation
    const maxAmplitudeX = 10;       // Maximum horizontal movement in pixels
    const maxAmplitudeY = 10;       // Maximum vertical movement in pixels
    const maxAmplitudeZ = 10;       // Maximum depth movement in pixels
    const maxFrequencyX = 0.005;    // Maximum speed of horizontal animation
    const maxFrequencyY = 0.007;    // Maximum speed of vertical animation
    const maxRotation = 20;         // Maximum rotation in degrees
    const maxScale = 1.2;           // Maximum scaling factor (1 = original size)
    //const maxHueShift = 360;        // Maximum hue shift in degrees (full color cycle)
    const delayIncrement = 1;      // Delay increment in milliseconds for each element
    const growthRate = 0.0002;     // Rate at which amplitude, frequency, rotation, scale, and hue shift grow

    // ACTUAL CODE:

    const elements = document.querySelectorAll('*');

    elements.forEach((element, index) => {
        const delay = index * delayIncrement;
        let startTime;

        function animate(time) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime + delay;

            // Calculate
            const amplitudeX = Math.min(maxAmplitudeX, elapsed * growthRate);
            const amplitudeY = Math.min(maxAmplitudeY, elapsed * growthRate);
            const amplitudeZ = Math.min(maxAmplitudeZ, elapsed * growthRate);
            const frequencyX = Math.min(maxFrequencyX, elapsed * growthRate);
            const frequencyY = Math.min(maxFrequencyY, elapsed * growthRate);
            const rotation = Math.min(maxRotation, elapsed * growthRate * 2); // Faster rotation growth
            const scale = 1 + Math.min(maxScale - 1, elapsed * growthRate / 1000); // Scale grows slower
            //const hueShift = (elapsed * growthRate * 100) % maxHueShift; // Cycles through hue shifts

            // Calculate oscillating transformations
            const x = amplitudeX * Math.sin(frequencyX * elapsed + index);
            const y = amplitudeY * Math.sin(frequencyY * elapsed + index);
            const z = amplitudeZ * Math.sin(frequencyX * elapsed + index);
            const rotate = rotation * Math.sin(frequencyY * elapsed + index);

            // Apply
            element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate(${rotate}deg) scale(${scale})`;
            //element.style.filter = `hue-rotate(${hueShift}deg)`;

            // Continue animation
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    });
})();
