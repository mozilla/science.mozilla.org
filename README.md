[![Build Status](https://travis-ci.org/mozilla/science.mozilla.org.svg?branch=master)](https://travis-ci.org/mozilla/science.mozilla.org)

# science.mozilla.org

**The 2016 rebuild-in-progress.**

**For the code fueling [http://mozillascience.org](http://mozillascience.org) see [this branch](https://github.com/mozilla/science.mozilla.org/tree/mozillascience.org).**

## Requirements for Development

- `node`
- `npm`

## Setup for Development

- `git clone https://github.com/mozilla/science.mozilla.org.git`
- `cd science.mozilla.org`
- `npm start`

## Customizing Your Development Environment

By default the app will use the configuration file located in `config/defaults.env`, which contains the following environment variables:

- `SCIENCE_API` : The web service that provides data to the Events, Study Groups, Resources, and Projects sections.
- `WP_API` : The service that provides content from the Science team's WordPress blog. This is used to fetch the data to build the Blog overview and detail views.

If you want to override the default settings, you can create a `.env` file in the project root and set values as needed.

## Folder and File Structure

```
app
├── assets
│   ├── favicons <- Assorted favicons.
│   └── img <- General image assets.
├── js <- Non-React JavaScript code.
├── react <- JSX and associated SCSS files.
│   ├── components <- JSX components that are used between multiple views and associated SCSS.
│   └── pages <- View-specific JSX and SCSS.
└── scss <- General application SCSS

config
└── defaults.env <- Default environment variables. Edit `/.env` for local overrides.

dist <- Contains compiled code. Don't edit these files directly!
```

## Linting and Code Standards

All JS and SCSS code must pass our code conventions as defined by several linting systems. You can test your local code by running `npm test`. Pull requests *must pass* before being merged.

### JavaScript

For JavaScript, this project extends the Mozilla Foundation's [ESLint rule set](https://github.com/MozillaFoundation/mofo-style/blob/master/.eslintrc.yaml). The specific extensions can be seen in `.eslintrc.yaml`. Refer to ESLint's [documentation](http://eslint.org/docs/rules/) for an explanation of the rules.

### SCSS

For SCSS, we use [StyleLint](http://stylelint.io/) with the standard configuration. See StyleLint's [rules documentation](http://stylelint.io/user-guide/rules/) for more information.

It's highly recommended that you add plugins to your editor of choice that can read the local "RC" files in the root of the codebase, `.eslintrc.yaml` and `.stylelintrc`, so you can see errors as they occur.

### Additional Conventions

- Files should be named with `hyphenated-lowercase`.
- Code indentation is two spaces.
- Use [Bootstrap 4](https://v4-alpha.getbootstrap.com/getting-started/introduction/) classes whenever possible and relevant, rather than writing more style code.

## Git Flow

This project uses [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/). All pull requests should be made against the `develop` branch.

- `develop` maps to [Staging](https://science-mozilla-org-staging.herokuapp.com)
- `master` maps to [Production](https://science-mozilla-org-production.herokuapp.com)
