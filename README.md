# Barista

![GitHub repo size](https://img.shields.io/github/repo-size/maxnelson/barista)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fmaxnelson%2Fbarista&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+daily+%2F+total&edge_flat=false)](https://hits.seeyoufarm.com)

Barista is a vite/rollup plugin that scans your project's HTML / JSX and creates non-semantic CSS Rules based on classNames that conform to a format which you define.

## Installation

Install using npm

```sh
npm install @modularmoon/barista --save-dev
```

## Configuration

Update the plugins object of your `vite.config` file to include the following plugin function.

```js
classnameExtractor({
      include: ["src/**/*.{js,ts,jsx,tsx,html}"],
      outputFilepath: "src/css/barista.css",
      delimiter1: "_",
      delimiter2: "--",
    }),
```

For clarity, your entire config object should look something like this:

<pre><code>export default defineConfig({
  plugins: [
    react(),
    <span style="color: red;">classnameExtractor({
      include: ["src/**/*.{js,ts,jsx,tsx,html}"],
      outputFilepath: "src/css/barista.css",
      delimiter1: "_",
      delimiter2: "--",
    })</span>,
    ...],
    server: {...}});</code></pre>

Now you can link to this local CSS file normally as a stylesheet, via your preferred method.

i.e. via HTML:

```html
<link rel="stylesheet" href="src/css/classyCSS.css" />
```

or via Javascript:

```js
import "./css/classyCSS.css";
```

## Usage

In your HTML or JSX, whenever you want to include a non-semantic classname to simply apply a basic CSS property / value to an element, simply include the classname delineated with the delimiter options you specified in your plugin object.

### Examples

```html
<p className="_display--inline-block"></p>
```

will be scanned, parsed and formatted into the following CSS Rule:

```css
._display--inline-block {
  display: inline-block;
}
```

### Configuration Options

include: This is an array of filepaths + filename extensions that you want Barista to scan for classNames.
outputFilePath: This is the filepath + filename where you'd like Barista to generate it's CSS file.
delimiter1: This is the symbol you'd like to include as the first character of your non-semantic classNames, in order to indicate to Barista that you'd like it to parse / format these classnames into CSS Rules.
delimiter2: This is the symbol you'd like to include inbetween the property and the value of the classname, in order to delineate the two.

### License

Barista is distributed under [MIT License](https://github.com/maxnelson/barista/blob/main/LICENSE.md)
