var stream = require('stream')
var util = require('util')

function ReadStream() {
    stream.Readable.call(this)
}

util.inherits(ReadStream, stream.Readable)


ReadStream.prototype._read = function () {

    this.push('I ')
    this.push('Love ')
    this.push('Immoc\n')
    this.push(null)
}

function WriteStream() {
    stream.Writable.call(this)
    this._cached = new Buffer('')
}

util.inherits(WriteStream, stream.Writable)
// WriteStream.setEncoding('utf8');
WriteStream.prototype._write = function (chunk, encode, cb) {
    console.log(chunk.toString())
    if (cb != null) {
        cb()
    }
}

function TransformStream() {
    stream.Transform.call(this)
}

util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function (chunk, encode, cb) {
    this.push(chunk)
    cb()
}

TransformStream.prototype._flush = function (chunk, encode, cb) {
    this.push('oh yeah!')
    if (cb != null) {
        cb()
    }
}

var rs = new ReadStream()
// rs.setEncoding('utf8')
var ws = new WriteStream()
var ts = new TransformStream()
// ts.setEncoding('utf8')

rs.pipe(ts).pipe(ws)