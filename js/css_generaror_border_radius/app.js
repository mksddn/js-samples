const inputRange = document.querySelectorAll('input.range'),
      inputText = document.querySelectorAll('input.text');

const inputTL = document.getElementById('rangeTL'),
      inputTR = document.getElementById('rangeTR'),
      inputBL = document.getElementById('rangeBL'),
      inputBR = document.getElementById('rangeBR');

const square = document.getElementById('square');

const resultTL = document.getElementById('resultTL'),
      resultTR = document.getElementById('resultTR'),
      resultBL = document.getElementById('resultBL'),
      resultBR = document.getElementById('resultBR');


changeRadius(inputRange, 'input.text');
changeRadius(inputText, 'input.range');


// function changeRadius(el, input) {
//     for(let [i, node] of el.entries()) {
//         node.addEventListener('input', function() {
//             const closest = this.closest('div').querySelector(input);
//             let val = this.value;
//             closest.value = val;
//             if (i === 0) {
//                 square.style.borderTopLeftRadius = `${val}px`;
//                 getResult(resultTL, val);
//             } else if (i === 1) {
//                 square.style.borderTopRightRadius = `${val}px`;
//                 getResult(resultTR, val);
//             } else if (i === 2) {
//                 square.style.borderBottomLeftRadius = `${val}px`;
//                 getResult(resultBR, val);
//             } else if (i === 3) {
//                 square.style.borderBottomRightRadius = `${val}px`;
//                 getResult(resultBL, val);
//             }
//         });
//     }
// }

// function getResult(el, val) {
//     el.innerHTML = val;
// }

function changeRadius(el, input) {
    for(let node of el) {
        node.addEventListener('input', function() {
            const closest = this.closest('div').querySelector(input);
            let val = this.value;
            closest.value = val;
            let reStyle = inputTL.value + 'px ' + inputTR.value + 'px ' + inputBR.value + 'px ' + inputBL.value + 'px';
            square.style.borderRadius = reStyle;
            document.getElementById('result').innerHTML = reStyle;
        });
    }
}
