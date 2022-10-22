const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, value) => {
        console.log('Total', total)
        return total + value.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => {
        return b.likes - a.likes
    })[0]
}

const getMax = (authors, value) => {
    const authorWithTheMost = [...authors.entries()].reduce((a, b) => b[1] > a[1] ? b : a)

    return {author: authorWithTheMost[0],
            [value]: authorWithTheMost[1]}
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) return undefined

    authors = new Map()
    blogs.map(o => {
        if (authors.has(o.author)) {
            authors.set(o.author, authors.get(o.author) + 1)
        }
        else {
            authors.set(o.author, 1)
        }
    })

    return getMax(authors, "blogs")
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) return undefined

    authors = new Map()
    blogs.map(o => {
        if (authors.has(o.author)) {
            authors.set(o.author, authors.get(o.author) + o.likes)
        }
        else {
            authors.set(o.author, o.likes)
        }
    })

    return getMax(authors, "likes")
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
