# django-encore-webapp

Django & Webpack Encore

## Setup (Windows)

1.   Install [Scoop](https://scoop.sh/).
1.   `scoop install git`
1.   `git config --global user.name "MyUsername"`
1.   `git config --global user.email "My@Email"`
1.   `scoop install yarn miniconda3`
1.   `yarn`
1.   `conda install -n root -c pscondaenvs pscondaenvs`
1.   `conda init powershell` (or the preferred shell)
1.   `conda env create -f environment.yml`
1.   `conda activate encore`
1.   Configure Django's database in core settings.
1.   `python manage.py migrate`

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

## Notes

*   [PostCSS](https://github.com/postcss/postcss#postcss-) and [Autoprefixer](https://github.com/postcss/autoprefixer#autoprefixer-) handle polyfills automatically through [Browserslist](https://github.com/browserslist/browserslist#browserslist-) config definitions.
*   Delete Babel's cache at `node_modules/.cache/babel-loader/` and restart Webpack if it's running when `.browserslistrc` is changed.
*   If `HONCHO_PROCESS_NAME` is not null and has a value, then we're in a Honcho runtime environment.

## References

*   <https://ota-meshi.github.io/eslint-plugin-jsonc/rules/>
