function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}
BufferLoader.prototype.loadBuffer = function(url, index) {
// Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function() {
// Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount === loader.urlList.length)
                        loader.onload(loader.bufferList);
                }
        );
    };
    request.onerror = function() {
        alert('BufferLoader: XHR error');
    };
    request.send();
};

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};

function MachineGun(context) {
    var ctx = this;
    var loader = new BufferLoader(context, [
        'audio/scratches/scratch-07-two.wav',
        'audio/scratches/scratch-08-six.wav'
    ], onLoaded);

    function onLoaded(buffers) {
        ctx.buffers = buffers;
    }

    loader.load();
}

MachineGun.prototype.shootRound = function(type, rounds, interval, random, random2) {
    if (typeof random === 'undefined') {
        random = 0;
    }

    var time = context.currentTime;
    // Make multiple sources using the same buffer and play in quick succession.
    for (var i = 0; i < rounds; i++) {
        var source = this.makeSource(this.buffers[type]);
        source.playbackRate.value = 1 + Math.random() * random2;
        source.start(time + i * interval + Math.random() * random);
    }
};

MachineGun.prototype.makeSource = function(buffer) {
    var source = context.createBufferSource();
    var compressor = context.createDynamicsCompressor();
    var gain = context.createGain();
    gain.gain.value = 0.2;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(compressor);
    compressor.connect(context.destination);
    return source;
};

var context = window.webkitAudioContext;
mgun = new MachineGun(context);
mgun.shootRound(0, 3, 0.1);