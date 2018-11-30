# Markdown With Extensions

Inconspicuous markdown extensions using comment directives. 

## Usage

```sh
$ docker run -v /local/path:/docker/path villardl/markdownx [-u] /docker/path/<file.md>
```

where `-u` update `file.md` in place. 


## Fenced code block from file

Directive: 
```
[//]#code(<file>, [<language>])
```

[example](./test/include-code.md)
