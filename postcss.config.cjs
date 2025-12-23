module.exports = {
  plugins: [
    // Add vendor prefixes for browser compatibility
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
      ],
    }),

    // Minify CSS in production
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('cssnano')({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
              },
            ],
          }),
        ]
      : []),
  ],
};
