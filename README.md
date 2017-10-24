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

### handle

#### handle.save(savePath, srcPath)

获取模块文件的执行结果，并将结果保存在相应的路径下。

#### handle.saveJSON(savePath, data)

将 JSON 格式的对象保存为json文件。

#### handle.getModuleResult(filePath, ...props)

通过模块的路径，获取模块的执行结果。如果 `filePath` 对应的模块返回一个函数，则 `...props` 将作为该函数的参数传递进去