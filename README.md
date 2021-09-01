# django-encore-webapp

Django & Webpack Encore

[![Dependencies Status](https://status.david-dm.org/gh/TropicalRaisel/django-encore-webapp.svg)](https://david-dm.org/TropicalRaisel/django-encore-webapp)
[![Dev Dependencies Status](https://status.david-dm.org/gh/TropicalRaisel/django-encore-webapp.svg?type=dev)](https://david-dm.org/TropicalRaisel/django-encore-webapp?type=dev)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## Setup (Windows)

```powershell
# Install Scoop
Set-ExecutionPolicy RemoteSigned -scope CurrentUser # Will prompt to change the settings; choose "A"
Invoke-Expression (New-Object System.Net.WebClient).DownloadString("https://get.scoop.sh")

scoop install git # Needs to be installed before anything else
git config --global user.name "Username"
git config --global user.email "Email"
scoop install aria2 # Install to speed up future downloads
scoop install yarn miniconda3

git clone "https://github.com/TropicalRaisel/django-encore-webapp.git" # Will prompt for GitHub signin; select the "manager-core" for each auth option
cd django-encore-webapp

yarn set version berry # Enable Yarn 2
yarn # Configures all Webpack dependencies

conda install -n root -c pscondaenvs pscondaenvs # Enables setting the conda environment from a CLI
conda init powershell # Set the target CLI environment to powershell
# RESTART POWERSHELL
conda env create -f environment.yml
conda activate encore
python manage.py migrate # Only applied to the sample SQLite DB
```

## Setup (General)
```bash
yarn set version berry  # Enable Yarn 2!
yarn sdks vscode  # Or your choice IDE
```
Create a copy of `.env.example` and rename it to `.env`.

## Usage

### Runtime
```
honcho start
```

### Update Python Dependencies
```
conda update --all
```

### Export Python Dependencies
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

*   <https://www.valentinog.com/blog/webpack-django/>
*   <https://www.accordbox.com/blog/definitive-guide-django-and-webpack/>
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
*   <https://www.cloudhadoop.com/sass-as-division/>
*   <https://yarnpkg.com/getting-started/migration>
*   <https://blog.heroku.com/building-a-monorepo-with-yarn-2>
