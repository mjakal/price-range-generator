# Price Range Generator

Algorithm written in node.js that generates the list of prices within provided range.

## How to run it

Clone the repo:
```
git clone https://github.com/mjakal/price-range-generator.git
```

Run the script:
```
node generator.js
```

## How to test it

You can play around by modifying testList variable.

Generator input
```
const testList = [{ min: 1859, max: 4568, items: 10 }]
```

Expected generator output:
```
[
  { from: 1800, to: 2080 },
  { from: 2081, to: 2360 },
  { from: 2361, to: 2640 },
  { from: 2641, to: 2920 },
  { from: 2921, to: 3200 },
  { from: 3201, to: 3480 },
  { from: 3481, to: 3760 },
  { from: 3761, to: 4040 },
  { from: 4041, to: 4320 },
  { from: 4321, to: 4600 }
]
```
