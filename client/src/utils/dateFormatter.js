const dateFormatter = date => {
    let d = new Date(date)
    // year formatting
    let year = new Intl.DateTimeFormat('en', {year:'numeric'}).format(d)

    // month formatting
    let month = new Intl.DateTimeFormat('en', {month:'short'}).format(d)

    // day formatting
    let day = new Intl.DateTimeFormat('en', {day:'2-digit'}).format(d)

    return `${day}-${month}-${year}`
}

export default dateFormatter