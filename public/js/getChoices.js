
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
            seed = (166401010525 * seed + 101390104223) >>> 0;
            // console.log("seed updated: ", seed)
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
    // console.log("day!",today);
    // console.log("seed!", seed);
    const prng = createSeededPRNG(seed);

    function TEST_PRNG() {

        let test_dict = {}

        for(let items_idx = 0; items_idx < items.length; items_idx++) {
            test_dict[String(items_idx)] = 0;
        }

        let dict_days = {"1": 31,
                 "2": 28,
                 "3": 31,
                 "4": 30,
                 "5": 31,
                 "6": 30,
                 "7": 31,
                 "8": 31,
                 "9": 30,
                 "10": 31,
                 "11": 30,
                 "12": 31}

        let all_dates = []

        for(let i = 0; i < 12; i++) {
            let str_m = String(i + 1)
            for(let day = 0; day < dict_days[str_m]; day++) {
                all_dates.push(`2025-${str_m.padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`)
            }
        }

        console.log('All dates 2025:', all_dates)

        let test_dates = all_dates;

        test_dates.forEach((date)=> {
            console.log("test date:", date);
            console.log("hashed date (seed)", hashDateString(date));
            const rand_num_gen = createSeededPRNG(hashDateString(date))
            
            const choices = [];
            while (choices.length < 3) {
                let idx = getUniformRandomIndex(items.length, rand_num_gen)
                console.log("index:", idx)
                console.log("which is:", items[idx])
                choices.push(items[idx]);
                test_dict[String(idx)] += 1;
            }
            console.log("sup brah! here are your stretches:", choices);
        })

        console.log("test_dict distribution:", test_dict)

    }

    // TEST_PRNG();

    const reject = (chosen, idx) => idx == chosen[0] || idx == chosen[1];

    const choices = [];
    const indices = [];
    while (choices.length < 3) {
        let index = getUniformRandomIndex(items.length, prng);
        while(reject(indices, index)) {
            index = getUniformRandomIndex(items.length, prng);
        }
        choices.push(items[index]);
        indices.push(index);
    }
    return choices;
}