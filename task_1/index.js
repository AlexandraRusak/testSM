import {encoded, translations} from './data.js'

function decode(arr, transl) {
    return arr.map((arrItem) => {
      let updatedData = {}
      Object.keys(arrItem).forEach(arrKey => {
        if (arrKey.slice(-2) === "Id" && arrKey !== "groupId") {
          const tKey = Object.keys(transl).filter(translKey => translKey === arrItem[arrKey])
          if (tKey.length === 1) {
            updatedData[arrKey] = transl[tKey]
          } else { return }
        }
      })
      return { ...arrItem, ...updatedData }
    })
  }
  
  const decoded = decode(encoded, translations)
  
  console.log(decoded)

  
  function getEncodedUniqueIds(arr) {
    const numbers = arr.map((arrItem) => {
      return Object.keys(arrItem).map(arrKey => {
        if (arrKey.slice(-2) === "Id" && arrKey !== "groupId") {
          return arrItem[arrKey]
        } else { return }
      })
    }).flat()
  
    const numbersSet = new Set(numbers)
    const newNumbers = Array.from(numbersSet)
    return newNumbers.filter(number => (number))
  }
  
  const uniqueIds = getEncodedUniqueIds(encoded)
  console.log(uniqueIds)