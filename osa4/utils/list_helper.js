const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, value) => {
        console.log('Total', total)
        return total + value.likes
    }, 0)
}

module.exports = {
    dummy,
    totalLikes
  }

