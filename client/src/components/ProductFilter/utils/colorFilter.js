import _ from 'lodash'

const colorFilter = (row, colors) => {
  console.log('colorFilter', row, colors)
  if (!colors.length || !colors) return true
  const { variants } = row
  let color = false
  variants.forEach((variant) => {
    const { color: variantColor } = variant
    if (_.includes(colors, variantColor)) {
      color = true
      return
    }
  })
  return color
}

export default colorFilter;