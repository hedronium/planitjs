module.exports = (fs, clc, path) => {
    // checks if module is available to load
    var isModuleAvailableSync = function(moduleName) {
        var ret = false; // return value, boolean
        var dirSeparator = require("path").sep;

        // scan each module.paths. If there exists
        // node_modules/moduleName then
        // return true. Otherwise return false.
        module.paths.forEach(function(nodeModulesPath) {
            if(fs.existsSync(nodeModulesPath + dirSeparator + moduleName) === true) {
                ret = true;
                return false; // break forEach
            }
        });

        return ret;
    }

    // Check if there's a plans directory
    fs.access('plans', fs.constants.F_OK, (err) => {
        if (err)
            console.log(clc.red("Could not find 'plans' directory."));
        else {
            fs.readdir('plans', (err, filenames) => {
                // Go through the plans one by one and process 'em
                for (i = 0; i < filenames.length; i++) {
                    filename = filenames[i]; // File name
                    flavor = 'planitjs-' + path.parse(filename).name.split('-')[0];
                    arguments = path.parse(filename).name.split('-').splice(1);

                    // Check installation of flavor
                    if (!isModuleAvailableSync(flavor)) {
                        require(flavor);
                        console.log(clc.red(flavor + ' has not been not installed.'));
                        continue;
                    }

                    // Process the plan based on the flavor
                    try {
                        data = fs.readFileSync('plans/' + filename, 'utf8');   
                    } catch (err) {
                        console.log(clc.red("Error occurred whilst attempting to read '" + filename + "'"));
                        continue;
                    }
                    
                    require(flavor)(data, arguments);
                }
            });
        }
    });
};