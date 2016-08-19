'use strict';

var isValid = require('is-valid-app');

module.exports = function fn(app) {
  if (!isValid(app, 'generate-log')) return;

  /**
   * Plugins
   */

  app.use(require('generate-defaults'));

  /**
   * Generate a `changelog.md` file. For API usage this task is also aliased as `changelog`.
   *
   * ```sh
   * $ gen generator:log
   * ```
   * @name log
   * @api public
   */

  app.task('default', ['changelog']);
  app.task('changelog', function() {
    app.helper('date', require('helper-date'));

    return app.src('templates/CHANGELOG.md', {cwd: __dirname})
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(app.conflicts(app.cwd))
      .pipe(app.dest(app.cwd));
  });
};
