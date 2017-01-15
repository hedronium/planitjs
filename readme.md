##Planitjs - BETA
> For Node.js 6

A planning tool made for humans which lets them define their plans in common data storage formats (e.g. YAML, JSON).

##Philosophy
Planitjs has been written to maximise productivity. It's based on the simple principles of demand and supply. Here, planning is part of demanding whilst planitjs is the supplier.

##Installation

Grab it through npm.
> Install it globally to use CLI commands.

```bash
npm install -g planitjs
```

##Usage
Planitjs can be used as a CLI tool and/or as a typical npm package.

You define plans in a common data storage format like YAML or JSON and let planitjs turn them into reality.

###Commands##
####Process
```bash
planitjs
```
Process the plan files.
####Version
```bash
planitjs --version
```
Get version of installed planitjs.

##Plan files
>The system for extending the types of plans supported is still being developed. Stay tuned!

Plans files are defined in formats like YAML, JSON, etc.

It is the job of planitjs to turn your plans into reality through the data provided in the plan files :)

New flavors of plans can be added by installing specific node modules.

File name of a plan file indicates the flavor (type of plan).

For example, a plan file named `fs.yaml` will instruct planitjs to use the node module `planitjs-fs` for processing it.

> Node modules related to a plan flavor are prefixed `planitjs-`.