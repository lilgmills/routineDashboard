
export function getChoices(today, items) {
    function getUniformRandomIndex(max, prng) {
        while (true) {
            const val = Math.floor(prng() * 32); // 5 bits
            if (val < max) return val;
        }
    }

    function createSeededPRNG(seed) {
        return function() {
            // Linear Congruential Generator (LCG)
            seed = (1664525 * seed + 1013904223) >>> 0;
            return seed / 0xFFFFFFFF;
        }
    }

    function hashDateString(dateStr) {
        let hash = 0;
        for (let i = 0; i < dateStr.length; i++) {
            hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
        }
        return hash;
    }


    const seed = hashDateString(today);
    const prng = createSeededPRNG(seed);

    const choices = [];
    while (choices.length < 3) {
        const index = getUniformRandomIndex(items.length, prng);
        choices.push(items[index]);
    }
    return choices;
}