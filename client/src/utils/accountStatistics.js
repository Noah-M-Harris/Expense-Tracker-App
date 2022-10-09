// Function takes an array and manipulates it to give us the total, min, max, and avg
const calculateTransaction = arr => {
    const transactionArr = arr?.map(data => data?.amount)

    // Sum
    const sumTotal = arr?.map(data => data?.amount).reduce((acc, curr) => {
        return Number(acc) + Number(curr)
    }, 0)

    // Avg
    const avg = sumTotal / 2

    // Min
    const min = Math.min(...transactionArr)

    // Max
    const max = Math.max(...transactionArr)

    return {
        sumTotal,
        avg,
        min,
        max
    }

}

export default calculateTransaction