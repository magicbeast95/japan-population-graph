module.exports = {
  endOfLine: 'auto',
  semi: false,
  singleQuote: true,
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    require('prettier-plugin-packagejson'),
  ],
  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^[.@]\\/(?!.*.css$)', '^[.@]\\/.*.css$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}