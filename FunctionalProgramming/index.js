const flow = (...funcs) => args => funcs.reduce((acc, func) => func(acc), args);

const filter = predicate => items => items.filter(predicate);
const map = projection => items => items.map(projection);
const reduce = (acc, initValue) => items => items.reduce(acc, initValue);

const hasColor = color => rectangle => rectangle.color === color;
const isBlack = hasColor('black');

const isSquare = rectangle => rectangle.width === rectangle.height;

const and = (dec1, dec2) => arg => dec1(arg) && dec2(arg);

const or = (dec1, dec2) => arg => dec1(arg) || dec2(arg);

const all = (...args) => arg => args.every(dec => dec(arg) === true);

const any = (...args) => arg => args.some(dec => dec(arg) === true);

let test = { color: 'black', width: 5, height: 5 };

// console.log(
//     any(isSquare, isBlack)(test)
//     );

const calcArea = rectangle => rectangle.width * rectangle.height;

const compareSq = (max, curr) => max > curr ? max : curr;

const rectangles = [
    { color: 'yellow', width: 1, height: 5 },
    { color: 'red', width: 3, height: 3 },
    { color: 'red', width: 7, height: 7 },
    { color: 'red', width: 13, height: 13 },
    { color: 'red', width: 23, height: 23 },
    { color: 'red', width: 33, height: 33 },
    { color: 'red', width: 43, height: 43 },
    { color: 'red', width: 53, height: 53 },
    { color: 'red', width: 63, height: 63 },
    { color: 'black', width: 5, height: 3 },
    { color: 'black', width: 6, height: 6 }
]

const calcMaxBlackSquareArea = flow(
    filter(and(isBlack, isSquare)),
    map(calcArea), // rects => rects.map(calcArea)
    reduce(compareSq, -Infinity)
)

console.log(calcMaxBlackSquareArea(rectangles));

isRed = hasColor('red');

calcPerimeter = rectangle => rectangle.width + rectangle.height;
const calcAllSquarePerimeter = flow(
    filter(and(isRed, isSquare)),
    map(calcPerimeter)
)

console.log(calcAllSquarePerimeter(rectangles))