const a: string = "hello world";
const x: number = 4;
const y: number = 9;
const isActive: boolean = false;
// const temp;
// let temp2;
// var temp3;
// console.log(temp2, temp3)

interface IObjKey {
  [key: string]: any;
}

interface IObjParams extends IObjKey {
  value: string;
  param2: string | null;
}

const obj: IObjParams = {
  value: "hello world",
  param2: "hello",
  str: "hello world",
};

// Object.create()

const aa: string | null = null;

function fn(x: number): void {
  console.log(x);
}
fn(10);

interface IProps {
  onHandleClick: () => void;
  value: string;
}

const props: IProps = {
  onHandleClick: () => console.log("hello world"),
  value: "hello",
};

function throwError(message: string) {
  return message;
}

interface IInfoAboutMe {
  name: string;
  lastName: string;
  age: number;
}

const infoAboutMe: { name: string; lastName: string; age: number } = {
  name: "hello",
  lastName: "world",
  age: 288,
};

function fn2(obj: IInfoAboutMe): string {
  return `${obj.name}`;
}

const arrNums: number[]  = [1, 4, 9, 2, 99]
// arrNums.push('helo wroil') - является ошибкой. arrNums ожидает только числа

function countArray(arr: number[]): number {
    // return arr.filter((item) => item >= 4)
    return arr.reduce((prev, curr) => prev + curr, 0)
}

console.log(countArray([1, 4, 5, 2]))

const tuple: [number, number, string, string] = [43, 42, 'hello', 'boolean']
