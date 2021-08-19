//define color

const hasColor = color => rectangle => rectangle.color === color;
const 

const isYellow = hasColor('yellow');

console.log(isYellow({ color: 'yellow' })); 

const filter = predicate => items => items.filter(predicate);
const map = projection => items => items.map(projection);
const reduce = (acc, initValue) => items => items.reduce(acc, initValue);

const flow

const rectangles = [
    { }, 
    { }, 
    { }
]
const calcMaxBlackSquareArea = flow(
    filter(and(isBlack, isSquare)),
    map(calcArea), // rects => rects.map(calcArea)
    reduce(max, -Infinity)
)

console.log(calcMaxBlackSquareArea(rectangles));