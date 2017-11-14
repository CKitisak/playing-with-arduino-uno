var five = require('johnny-five')

var board = new five.Board()
board.on('ready', function () {
  var self = this

  var lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 4
  })
  var led = new five.Led(2)
  var servo = new five.Servo(6)
  var button = new five.Button({
    pin: 13,
    isPullup: true
  })

  self.repl.inject({
    lcd: lcd,
    led: led,
    servo: servo,
    button: button,
  })

  function lcdOff() {
    lcd.clear().off().noBacklight()
  }

  function lcdOn() {
    lcd.clear().on().backlight()
  }

  function turnOn() {
    servo.sweep()
    led.on()

    lcd.clear()
    lcd.cursor(0, 0).print('Servo Start')
    lcd.cursor(1, 0).print('LED on')

    self.wait(3000, function () {
      lcdOff()
    })
  }
  
  function turnOff() {
    servo.stop()
    led.off()

    lcd.clear()
    lcd.cursor(0, 0).print('Servo Stop')
    lcd.cursor(1, 0).print('LED off')

    self.wait(3000, function () {
      lcdOff()
    })
  }

  var ledState = false
  button.on('press', function(value) {
    lcdOn()
    lcd.cursor(0, 0).print('botton pressed!')
    self.wait(1000, function () {
      ledState = !ledState
      if (ledState) {
        turnOn()
      } else {
        turnOff()
      }
    })
  })

  lcd.clear().cursor(0, 0).print('Board is Ready')
});