module.exports = {
	clc: require('cli-color'),
	fs: require('fs'),
	path: require('path'),

	create: function (argv) {
		var moduleName = 'planitjs-' + argv[0];
		var filename = argv.join('-') + '.' + require(moduleName).getExtension();

		this.fs.access('plans/' + filename, this.fs.constants.F_OK, function (err) {
			if (!err)
				console.log(filename + " already exists.");
			else {
				if (this.isModuleAvailableSync(moduleName)) {
					this.fs.writeFileSync("plans/" + filename, '');
					console.log(this.clc.green("Created flavor file: plans/" + filename + ""))
				} else
					console.log(this.clc.red("'" + moduleName + "' wasn't found."));
			}
		}.bind(this));
	},

	init: function () {
        this.fs.access('plans', this.fs.constants.F_OK, function (err) {
            if (err) {
                this.fs.mkdirSync('plans');
                console.log(this.clc.green("Plans directory created."));
            } else
                console.log("Plans directory already exists.");
        }.bind(this));
    },

    // checks if module is available to load
    isModuleAvailableSync: function(moduleName) {
        var r = false; // return value, boolean
        var dirSeparator = require("path").sep;

        // scan each module.paths. If there exists
        // node_modules/moduleName then
        // return true. Otherwise return false.
        module.paths.forEach(function(nodeModulesPath) {
            if(this.fs.existsSync(nodeModulesPath + dirSeparator + moduleName) === true) {
                r = true;
                return false; // break forEach
            }
        }.bind(this));

        return r;
    },
    showVersion: function () {
        console.log(this.clc.blue("Planitjs v.1.0.5. Made by Towni and Eyan."));
    },
    showProcessedMessage: function (name) {
        console.log(this.clc.green("Processed ") + this.clc.black(name + "."));
    },
    showErrorMessage: function (message) {
        console.log(this.clc.red(message));
    },
    run: function (directory = 'plans') {
        // Check if there's a plans directory
        this.fs.access(directory, this.fs.constants.F_OK, (err) => {
            if (err)
                console.log(this.clc.red("Could not find 'plans' directory."));
            else {
                this.fs.readdir(directory, (err, filenames) => {
                    // Go through the plans one by one and process 'em
                    for (i = 0; i < filenames.length; i++) {
                        if (filenames[i][0] == '.') continue;

                        filename = filenames[i]; // File name
                        flavor = 'planitjs-' + this.path.parse(filename).name.split('-')[0];
                        arguments = this.path.parse(filename).name.split('-').splice(1);

                        // Check installation of flavor
                        if (!this.isModuleAvailableSync(flavor)) {
                            console.log(this.clc.red(flavor + ' has not been not installed.'));
                            continue;
                        }

                        // Process the plan based on the flavor
                        try {
                            contents = this.fs.readFileSync(directory + '/' + filename, 'utf8');   
                        } catch (err) {
                            console.log(this.clc.red("Error occurred whilst attempting to read '" + filename + "'"));
                            continue;
                        }
                        
                        require(flavor).run(contents, arguments);
                    }
                });
            }
        });
    }
};