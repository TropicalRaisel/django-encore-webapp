# django-encore-webapp

Django & Webpack Encore

## Setup (Windows)

Save the [Windows install script](https://raw.githubusercontent.com/TropicalRaisel/django-encore-webapp/main/scripts/setup.ps1) and run it to set everything up in one sitting!
Please review its changes to ensure they are acceptable. Run it like so:
```powershell
./setup.ps1 GitHub-Username GitHub-Email
```

## Usage

### Runtime
```
honcho start
```

### Update Python Dependencies
```
conda env export -f environment.yml
```
OR
```
yarn env
```

### Errors

#### `[webpack-dev-middleware] Error: EPERM: operation not permitted, lstat ...`
```
yarn purge
```
Then you should be good to go!
If the error persists due to `CopyWebpackPlugin`, just delete the `public/build` directory and it should work.
Otherwise, please report the issue.

## Notes

*   [PostCSS](https://github.com/postcss/postcss#postcss-) and [Autoprefixer](https://github.com/postcss/autoprefixer#autoprefixer-) handle polyfills automatically through [Browserslist](https://github.com/browserslist/browserslist#browserslist-) config definitions.
*   Delete Babel's cache at `node_modules/.cache/babel-loader/` and restart Webpack if it's running when `.browserslistrc` is changed.
*   If the `HONCHO_PROCESS_NAME` environment variable is not null and has a value, then we're in a Honcho runtime environment.
*   The [Dotenv](https://www.npmjs.com/package/dotenv) [Webpack plugin](https://github.com/mrsteele/dotenv-webpack) and [Python plugin](https://pypi.org/project/python-dotenv/) are not used since Honcho sets any environment variables discovered in `.env` automatically.

## References

*   <https://symfony.com/doc/current/frontend.html#webpack-encore>
*   <https://symfonycasts.com/screencast/webpack-encore>
*   <https://github.com/webpack-contrib/postcss-loader#config-files>
*   <https://github.com/browserslist/browserslist#browserslist>-
*   (django) <https://teckave.com/linting_and_code_formatting/>
*   <https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html>
*   <https://github.com/psf/black/tree/main/docs/compatible_configs>
*   <https://docs.djangoproject.com/en/3.2/topics/logging/>
*   <https://honcho.readthedocs.io/en/latest/>
*   <https://pypi.org/project/djlint/>
*   <https://medium.com/hackernoon/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7>
*   <https://hpbn.co/building-blocks-of-tcp/#slow-start>
*   <https://github.com/vuejs/preload-webpack-plugin>
*   <https://ota-meshi.github.io/eslint-plugin-jsonc/rules/>
*   <https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/>
