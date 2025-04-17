![Barista Logo](images/barista_logo.jpg)

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/maxnelson/barista)
![NPM Downloads](https://img.shields.io/npm/d18m/%40modularmoon%2Fbarista)

</div>

Barista is a vite plugin that scans your project's HTML / JSX and creates non-semantic CSS Rules
based on classNames that conform to a format which you define.

### Example

Include this in your HTML / JSX:

```html
<p className="_display--inline-block"></p>
```

And barista will generate the following CSS rule

```css
._display--inline-block {
	display: inline-block;
}
```

### How's it work?

You include class names adhering to the following format:

<ul>
<li>an initial character of your choice (i.e. `"_"` in the above
example)</li> 
<li>a valid CSS property name</li>
<li>a custom delimiter of your choice (i.e. `"--"` in the above
example)</li>
<li>a valid CSS value for the designated property.</li>
</ul>

That's all! Barista scans your project and generates CSS rules based on the property names and
values of your class names.

### Some more examples

<b>Classname:</b>

```html
<p className="_color--white"></p>
```

<b>Generated CSS Rule:</b>

```css
._color--white {
	color: white;
}
```

<b>Classname:</b>

```html
<div className="_width--50percent"></p>
```

<b>Generated CSS Rule:</b>

```css
._width--50percent {
	width: 50%;
}
```

<b>Classname:</b>

```html
<p className="_margin--1rem-0-10px-auto"></p>
```

<b>Generated CSS Rule:</b>

```css
._margin--1rem-0-10px-auto {
	margin: 1rem 0 10px auto;
}
```

# Setup

### 1. Install

Install using npm

```sh
npm install @modularmoon/barista --save-dev
```

### 2. Configure

Include the following import statement in your `vite.config` file:

```js
import baristaCSS from "@modularmoon/barista";
```

> **Note:** 💡 Make sure not to include any `{` `}` characters in the import statement, as this is
> the default module exported by the package.

Update the plugins object of your `vite.config` file to include the following plugin function.

```js
baristaCSS({
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
    <span style="color: red;">baristaCSS({
      include: ["src/**/*.{js,ts,jsx,tsx,html}"],
      outputFilepath: "src/css/barista.css",
      delimiter1: "_",
      delimiter2: "--",
    })</span>,
    ...],
    server: {...}});</code></pre>

#### Configuration Options

`include`: This is an array of filepaths + filename extensions that you want Barista to scan for
classNames.

`outputFilePath`: This is the filepath + filename where you'd like Barista to generate it's CSS
file.

`delimiter1`: This is the symbol you'd like to include as the first character of your non-semantic
classNames, in order to indicate to Barista that you'd like it to parse / format these classnames
into CSS Rules.

`delimiter2`: This is the symbol you'd like to include inbetween the property and the value of the
classname, in order to delineate the two.

### 3. Include

Now you can link to this local CSS file normally as a stylesheet, via your preferred method.

i.e. via HTML:

```html
<link
	rel="stylesheet"
	href="src/css/barista.css" />
```

or via Javascript:

```js
import "./css/barista.css";
```

## Usage

In your HTML or JSX, whenever you want to include a non-semantic classname to simply apply a basic
CSS property / value to an element, simply include the classname delineated with the delimiter
options you specified in your plugin object.

## Additional Functionality

The following additional custom rules / parsing logic have been built into the tool, in order to
support values like CSS variables, percentage symbols, and decimal points.

<h3>CSS Variables</h3>

<b>Classname:</b>

```html
<p className="_border--1px_solid_var_gray-100_"></p>
```

<b>Generated CSS Rule:</b>

```css
._border--1px_solid_var_gray-100_ {
	border: 1px solid var(gray-100);
}
```

<h3>Percentage symbol</h3>

<b>Classname:</b>

```html
<div className="_width--50percent"></p>
```

<b>Generated CSS Rule:</b>

```css
._width--50percent {
	width: 50%;
}
```

<h3>Decimal Points</h3>

<b>Classname:</b>

```html
<div className="_margin-bottom--0p5rem"></p>
```

<b>Generated CSS Rule:</b>

```css
._margin-bottom--0p5rem {
	margin-bottom: 0.5rem;
}
```

## Known Issues

Class names passed into JSX components as prop values are currently not being parsed, unless the key
name of the prop is 'className'.

## Contact

If you are using this repository, or have any feedback, please let me know! <br> <br>
https://x.com/modularmoon <br> <br> I created this tool as a fun learning project and have been
surprised to see a steady stream of weekly downloads on npm. I am not sure if these are all just
bots, so if you're a real person installing this please let me know! I have found it very useful in
my own personal projects and would be happy to actually update and improve it if I knew other people
were using it as well.

## More Info

A more detailed description and explanation of this tool can found in the following blog post:
https://maxnelsonwebsite.com/sketchblog/css/barista

### License

Barista is distributed under an
[MIT License](https://github.com/maxnelson/barista/blob/main/LICENSE.md)
