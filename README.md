# fs-handler
Handle file system by Node

## API

### util

#### util.isDirectory(paths)

当前的路径是否为路径

#### util.isFile(paths)

当前的路径是否为文件

### search

#### search.getAll(paths, options)

获得某路径下所有的文件和文件夹。返回一个数组，每个数组元素参考 [walk-sync](https://www.npmjs.com/package/walk-sync) 。

#### search.getAllFiles(paths)

获得某个路径下的所有文件，不包含文件夹。返回一个数组，每个数组元素参考 [walk-sync](https://www.npmjs.com/package/walk-sync) 。