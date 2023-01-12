import React from 'react'

const Test = () => {


    function checkFirstRepeatedStrigng(str) {
        const hash = {};
        for (let i = 0; i < str.length; i++) {
            if (!hash[str[i]]) {
                hash[str[i]] = 1;
            } else {
                hash[str[i]] += 1;
            }
        }
        // console.log(hash);
        Object.keys(hash).forEach((item, index) => {
            // console.log(item);
            if (hash[item] == 1) {
                console.log(item);
            }
        })
    }
    checkFirstRepeatedStrigng("teeter");
    return (
        <div></div>
    )
}

export default Test