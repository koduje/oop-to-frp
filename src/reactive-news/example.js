const array = [1, 2, 3, 4];

array.map(el => [el]);
// [ [1], [2], [3], [4] ]

array.flatMap(el => [el]);
// [ 1, 2, 3, 4 ]
