**[This project was sunsetted](https://blog.mozilla.org/foundation-archive/mozilla-science/news-from-mozilla-science-lab/) in September 2018. More information can be found at the [ScienceLab wiki](https://wiki.mozilla.org/ScienceLab).**

[![Build Status](https://travis-ci.org/mozilla/science.mozilla.org.svg?branch=master)](https://travis-ci.org/mozilla/science.mozilla.org)
[![Uses Mofo Standards](https://MozillaFoundation.github.io/mofo-standards/badge.svg)](https://github.com/MozillaFoundation/mofo-standards)

# science.mozilla.org

## Requirements for Development

- `node`
- `npm`

## Setup for Development

- `git clone https://github.com/mozilla/science.mozilla.org.git`
- `cd science.mozilla.org`
- `npm install`
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

#### Bootstrap

This site uses version 4 of the Bootstrap framework as well as [a custom Mozilla Foundation theme](https://github.com/mozilla/mofo-bootstrap).

Use [Bootstrap 4](https://v4-alpha.getbootstrap.com/getting-started/introduction/) classes whenever possible, rather than writing additional SCSS.

Refer to [this page](https://mozilla.github.io/mofo-bootstrap/demo/) for a demonstration of the non-standard and overridden components available to you. The demo also contains color variables that you can use. Whenever possible, use a color variable instead of hard coding a color value.

### Additional Conventions

- Files should be named with `hyphenated-lowercase`.
- Code indentation is two spaces.

## Git Flow

This project uses [GitHub Flow](https://guides.github.com/introduction/flow/) as per the [MoFo Standards](https://github.com/mozillafoundation/mofo-standards).

To submit a PR:
- Create a feature branch in this repo (or your own fork if you don't have appropriate permissions)
- Once the feature is ready, open a pull request against the `master` branch
- A review build will be automatically spun up if the new branch is on the Mozilla fork. Otherwise tag a Mozilla Foundation engineer to spin one up.
- Once merged in, `master` maps to [Staging](https://science-mozilla-org-staging.herokuapp.com)
- Once verified on staging, a MoFo engineer can promote it to production using Heroku.
