## Planitjs - BETA
> For Node.js 6

A planning tool made for humans which lets them define their plans in common data storage formats (e.g. YAML, JSON).

## Philosophy
Planitjs has been written to maximise productivity. It's based on the simple principles of demand and supply. Here, you define your demands through plan files while planitjs supplies your demand.

## Installation

Grab it through npm.
> Install it globally to use CLI commands.

```bash
npm install -g planitjs
```

## Usage
Planitjs can be used as a CLI tool and/or as a typical npm package.

You define plans in a common data storage format like YAML or JSON and let planitjs turn them into reality.

### Commands
#### Process
```bash
planitjs
```
Process the plan files.
#### Version
```bash
planitjs --version
```
Get version of installed planitjs.

## Plan files
>The system for extending the types of plans supported is still being developed. Stay tuned!

Plans files are defined in formats like YAML, JSON, etc.

It is the job of planitjs to turn your plans into reality through the data provided in the plan files :)

Planned to make a bunch or directory and files? Planitjs got your back!

### Flavors
For different type of plans, you need specific flavors to process them.

Specific flavors of plans can be used by installing node modules associated with the flavor.

File name of a plan file indicates the flavor (type of plan) and may contain hyphen separated arguments.

For example, a plan file named `fs.yaml` will instruct planitjs to use the node module `planitjs-fs` for processing it.

> Node modules related to a plan flavor are prefixed `planitjs-`.

### Attributes
Sometimes you may want to specify how a plan file should be processed. For example, you may want to include name of a song you're planning to write. You pass on the name as an attribute. 

Attributes can be provided in the filename of the plan file, separated by hyphens.

For e.g. naming a plan file `guitartab-strutter.txt` instructs planitjs to use the flavor 'guitartab' and passes the argument 'strutter', which is the name of the song, for processing it.

How arguments are dealt depends totally on the flavor. You can pass as many arguments as you like, just by separating them with hyphens.

## Development
### Flavors
Flavors are node modules responsible for processing a specific type of plan file.

Whenever a plan file is processed, the flavor associated with it is 'require'-d. Contents of the plan file and the arguments are passed on to the module's "run" method. Having a run method is a necessity for a node module to be qualified as a flavor.

##### Example
```js
// index.js
module.exports = {
    run: function (contents, args) {
        console.log("File contents: " + contents);
        console.log("First argument: " + args[0]);
    }
};