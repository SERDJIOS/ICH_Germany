import fs from 'fs';

// function mergeSort(arr) {
//     if (arr.length <= 1) return arr;

//     const mid = Math.floor(arr.length / 2);
//     const leftHalf = mergeSort(arr.slice(0, mid));
//     const rightHalf = mergeSort(arr.slice(mid));

//     return merge(leftHalf, rightHalf);
// }

// function merge(left, right) {
//     let sortedArray = [];
//     let i = 0, j = 0;

//     while (i < left.length && j < right.length) { 
//         if (left[i] < right[j]) {
//             sortedArray.push(left[i]);
//             i++;
//         } else {
//             sortedArray.push(right[j]);
//             j++;
//         }
//     }

//     return [...sortedArray, ...left.slice(i), ...right.slice(j)];
// }


// console.log(mergeSort([7, 2, 5, 1])); 

function mergeSortedFiles(fileNames, outputFile) {
    let numbers = [];

    fileNames.forEach(file => {
        const content = fs.readFileSync(file, 'utf8').trim().split('\n').map(Number);
        numbers = merge(numbers, content);
    });

    fs.writeFileSync(outputFile, numbers.join('\n'), 'utf8');
    console.log(`Объединенные данные сохранены в ${outputFile}`);
}

function merge(left, right) {

    let sortedArray = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) { 
        if (left[i] < right[j]) {
            sortedArray.push(left[i]);
            i++;
        } else {
            sortedArray.push(right[j]);
            j++;
        }
    }

    return [...sortedArray, ...left.slice(i), ...right.slice(j)];
}

export { mergeSortedFiles };
