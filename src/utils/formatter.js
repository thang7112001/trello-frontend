export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholder = (c) => {
  return {
    _id: `${c._id}-placeholder-card`,
    boardId: c.boardId,
    columnId: c._id,
    FE_PlaceholderCard: true
  }
}
