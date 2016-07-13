'use strict';

var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'generate-changelog')) return;

  /**
   * Plugins
   */

  app.use(require('generate-defaults'));

  /**
   * Template helpers
   */

  app.helper('date', require('helper-date'));

  /**
   * Alias for the [changelog](#changelog) task, to allow running this generator
   * with the following command:
   *
   * ```sh
   * $ gen changelog
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['changelog']);

  /**
   * Generate a `changelog.md` file.
   *
   * ```sh
   * $ gen generator:changelog
   * ```
   * @name changelog
   * @api public
   */

  app.task('changelog', function() {
    var dest = app.options.dest || app.cwd;
    return app.src('templates/changelog.md', {cwd: __dirname})
      .pipe(app.renderFile('*')).on('error', console.log)
      .pipe(app.conflicts(dest)).on('error', console.log)
      .pipe(app.dest(dest));
  });
};
