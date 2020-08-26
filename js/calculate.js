(function () {
    const init = () => {
        setupListeners();
    };

    // nominal in cents
    const denominations = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 25, 10, 5, 1];

    const setupListeners = () => {
        querySelector('#calculate-form').addEventListener('submit', calculateHandler);
    };

    const calculateHandler = e => {
        e.preventDefault();
        const sum = convertToCents(parseFloat(querySelector('#calculate-form-sum').value));
        const price = convertToCents(parseFloat(querySelector('#calculate-form-price').value));

        const rest = generateAnswer(sum - price);
        const nominalArr = calculateDenominations(sum - price);
        const nominalRest = generateNominalAnswer(nominalArr);

        M.createModal({ title: rest, description: nominalRest });
    };

    const calculateDenominations = change => {
        let calculations = [];
        let c = change;
        for (let i = 0; i < denominations.length; i++) {
            if (c === 0) break;
            if (denominations[i] > c) continue;

            const quotient = Math.floor(c / denominations[i]);
            c = c % denominations[i];
            calculations = [ ...calculations, ...new Array(quotient).fill(denominations[i]) ];
        }

        return calculations;
    };

    const convertToCents = amount => {
        return amount * 100;
    };

    const convertToDollars = amount => {
        return amount / 100;
    };

    const generateAnswer = rest => {
        const countDollars = Math.floor(rest / 100);
        const countCents = rest % 100;

        if (countDollars === 0) {
            return `Your rest is ${countCents} cents`;
        }
        if (countCents === 0) {
            return `Your rest is ${countDollars} dollars`;
        }
        return `Your rest is ${countDollars} dollars, ${countCents} cents`;

    };

    const generateNominalAnswer = nominal => {
        const convertNominal = nominal.map(n => {
            if (n >= 100) {
                const inDollars = convertToDollars(n);
                return `${inDollars} ${convertStringToMuch('dollar', inDollars)}`;
            }
            return `${n} ${convertStringToMuch('cent', n)}`;
        });

        return `(by nominal value of ${convertNominal.join(', ')})`;
    };

    const convertStringToMuch = (word, count) => {
          if (count > 1) return word + 's';
          return word;
    };

    init();
})();