##Filesystem Plans
A planitjs plan type for directory and file management.

You can:

- compare the current filesystem structure with your planned one
- write items in the filesystem exactly the way you plan
- delete items in the filesystem which are beyond your plan

###Example
```yaml
# plans/fs.yaml
- photos:
    - 2016:
        - January:
            - hawaii.jpg
            - thailand0.jpg
            - thailand1.jpg
            - thailand2.jpg
        - February:
            - <empty>
        - December:
            - <ignore>
    - 2015:
        - <ignore>
    - 2014:
        - <ignore>
- projects:
    - portfoloi-site:
        - index.html
        - about.html
        - projects.html
        - css:
            - style.css
        - sass:
            - style.sass
        - js
            - script.js
            - test.js
    - <ignore_siblings>
```

###Tags
When processing file system plans, you need to provide tags.

There are 3 tags (read, write and delete).

When providing tags as CLI arguments, you can use a combination of the three. In your combination, simply use the first letter of each tag and do not separate them with space.

**Read** tag just reads file system and matches it against the plan, giving summary of missing and unwanted files and directories.

>If 'read' tag isn't provided in a tag combination, planitis will assume it exists.

**Delete** tag removes unwanted files/directories.

**Write** tag creates missing files/directories.

###Commands
#### Process file system plans

```bash
planitis fsmaps <tags>
```
Process all file system plans.



Examples:

```bash
planitis fsmaps rwd
```
Read, create and delete tag is provided here. Missing and unwanted files/directories will be created and deleted respectively.

```bash
planitis fsmaps d
```
Unwanted files/directories will be deleted. Notice that the 'read' tag isn't provided and it won't make a difference as planitis assumes that it already exists.

#### Process a specified file system plan
```bash
planitis fsmap <tags> <file_name>
```
Process a specific file system plan.

Tags are explained under the previous heading.
File name is relative to `fsmaps/` in the directory you're currently in.