module.exports = (fs, clc, path) => {
    // Check if there's a plans directory
    fs.access('plans', fs.constants.F_OK, (err) => {
        if (err)
            console.log(clc.red("Could not find 'plans' directory."));
        else {
            fs.readdir('plans', (err, items) => {
                missing_flavors = 0;

                // Go through the plans one by one and process 'em
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    flavor = 'planitjs-' + path.parse(item).name;

                    // Check installation of flavor
                    try {
                        require.resolve(flavor);
                    } catch (err) {
                        console.log(clc.red(flavor + ' has not been not installed.'));
                        missing_flavors++;
                        continue;
                    }

                    // Process the plan based on the flavor
                    try {
                        data = fs.readFileSync('plans/' + item, 'utf8');   
                    } catch (err) {
                        console.log(clc.red("Error occurred whilst attempting to read '" + item + "'"));
                        continue;
                    }
                    
                    require(flavor)(data);
                }
            });
        }
    });
};