var osc = require("osc");

var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 8084,

    // This is where Renoise is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 8004
});

// Open the socket.
udpPort.open();

console.log("process.argv",process.argv)

var msg = {}

switch (process.argv[2]){
  case "hello":
    msg = {
        address: "/hello/from/oscjs",
        args: [Math.random()]
    };
    break;
  case "float":
    msg = {
      address: "/test",
      args: {
        type:"f",
        value:440.4
      }
    }
    break;
  case "integer":
    msg = {
      address: "/test",
      args: {
        type:"i",
        value:48
      }
    }
    break;
  case "number":
    msg = {
      address: "/test",
      args: [{
        type:"i",
        value:48
      },{
        type:"f",
        value:432.4
      }]
    }
    break;
  case "string":
    msg = {
      address: "/test",
      args: [{
        type:"s",
        value:"foo"
      },{
        type:"s",
        value:"bar"
      },{
        type:"s",
        value:"baz!"
      }],
    }
    break;
  case "colour":
    msg = {
      address: "/test",
      args: {
        type:"r",
        value:new Uint8Array([255,255,255,0])
      }
    }
    break;
  case "midi":
    msg = {
      address: "/test",
      args: {
        type:"m",
        value:new Uint8Array([0x00,0x90,0x45,0x65])
      }
    }
    break;
  case "blob":
    msg = {
      address: "/test",
      args: {
        type:"b",
        value:new Uint8Array([0x63,0x61,0x74,0x21])
      }
    }
    break;
  case "blob":
    msg = {
      address: "/test",
      args: {
        type:"b",
        value:new Uint8Array([0x63,0x61,0x74,0x21])
      }
    }
    break;
  // TODO
  case "time":
  case "float64":
  case "integer64":
  case "ascii":
  case "boolean_true":
  case "boolean_false":
  case "nil":
  case "inf":
  case "alt_string":
    break;
  default:
    error("Unknown message type")
}


// Every second, send an OSC message to Renoise
setInterval(function() {

    console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
    udpPort.send(msg);
}, 1000);
