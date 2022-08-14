/*
 * Configure step threshold and increment
 *
 * Adjust incrementAbove/incrementBelow depending on the step threshold
 * e.g. value [ from: 5.00, to: 6.00 ] becomes [ from: 5.01, to: 6.00 ]
 * e.g. value [ from: 5000, to: 11000 ] becomes [ from: 5001, to: 11000 ]
 */
const generatorConfig = {
  stepThreshold: 10,
  incrementBelow: 0.01,
  incrementAbove: 1,
}

// Check if value is numeric. Falsy values: '', 'test', null, NaN, undefined, 0
const isPositiveValue = (value) => { 
  if (isNaN(parseInt(value))) return false;

  return value >= 0;
}

/* 
 * Round number to closest most significant digit depending on type 'FLOOR'|'CEIL'
 * 'FLOOR': rounds to closest number below the provided value
 * 'CEIL' - rounds to closest number above the provided value
 */
const roundToSignificantDigit = (value = 0, type = 'FLOOR') => {
  const roundedValue = type === 'FLOOR' ? Math.floor(value) : Math.ceil(value);
  const digits = roundedValue.toString().length;
  let subtract = 0;
  
  // Adjust rounding precision by subtracting digits
  for (let i = 0; i < digits; i = i + 2) { subtract++; }

  const divider = Math.pow(10, digits - subtract);
  const fragment = roundedValue % divider;

  if (fragment === 0) return roundedValue;

  if (type === 'FLOOR') return roundedValue - fragment;
  
  return roundedValue + (divider - fragment);
};

/*
 * Function will return the list of generated prices
 */
const priceRangeGenerator = (min, max, items) => {
  // Validate params
  if (!isPositiveValue(min) || !isPositiveValue(max) || !isPositiveValue(items)) {
    throw 'All params must have positive numeric values.';
  }

  // Validate min/max values
  if (min > max) {
    throw 'Param max must be greater then min.';
  }

  // Validate items values
  if (items <= 0) {
    throw 'Param items must be greater then zero.';
  }

  const { stepThreshold, incrementBelow, incrementAbove} = generatorConfig;
  const roundedMin = roundToSignificantDigit(min, 'FLOOR');
  const roundedMax = roundToSignificantDigit(max, 'CEIL');
  const step = (roundedMax - roundedMin) / items;
  const isBelowThreshold = step < stepThreshold;
  const increment = isBelowThreshold ? incrementBelow : incrementAbove;
  const priceRange = [];

  // Round value depending on threshold
  const roundNumber = (value) => {
    return isBelowThreshold ? Math.round(value * 100) / 100 : Math.floor(value);
  }

  for (let i = roundedMin; i < (roundedMax - increment); i = i + step) {
    // Don't increment the first item
    const from = i === roundedMin ? i : i + increment;
    const to = i + step;
    
    priceRange.push({ from: roundNumber(from), to: roundNumber(to) });
  }

  return priceRange;
}

/*
 * ########################################
 * Generator test dataset
 * ######################################## 
 */
const testList = [
  { min: 0, max: 1.7, items: 3 },
  { min: 0.4, max: 3, items: 5 },
  { min: 9, max: 27, items: 5 },
  { min: 11.99, max: 89, items: 5 },
  { min: 237, max: 3589, items: 8 },
  { min: 1859, max: 4568, items: 10 },
  { min: 9000, max: 15000, items: 10 },
  { min: 999999, max: 3589600, items: 8 },
];

/* Start generator */
testList.forEach((item) => {
  const { min, max, items } = item;
  const result = priceRangeGenerator(min, max, items);

  console.log('################################################################################')
  
  console.log('\n Generator input:', item);
  console.log('Generator output:');
  console.log(result);
  
  console.log('');
});