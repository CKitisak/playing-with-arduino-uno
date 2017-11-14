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

    lcd.useChar("heart")
    lcd.useChar("note")
    lcd.useChar("smile")
    lcd.useChar("5")
    lcd.useChar("1")
    lcd.useChar("2")
    lcd.useChar("0")
    lcd.useChar("7")

    var button = new five.Button({
        pin: 13,
        isPullup: true
    })

    self.repl.inject({
        lcd: lcd,
        button: button,
    })

    var counter = 0

    function lcdOff() {
        lcd.clear().off().noBacklight()
    }

    function lcdOn() {
        lcd.clear().on().backlight()
    }

    button.on('press', function (value) {
        counter++
        lcdOn()
        switch (counter) {
            case 1: 
                
                lcd.cursor(0, 0).print('HAPPY BIRTHDAY')
                lcd.cursor(1, 0).print('TO YOU... :note: :note: :note:')
                break;
            case 2: 
                
                lcd.cursor(0, 0).print(':heart: :heart: GAME :heart: NA :heart: :heart:')
                lcd.cursor(1, 0).print(':smile: :smile: :smile: :smile: :smile: :smile: :smile: :smile:')
                break;
            case 3: 
                
                lcd.cursor(0, 0).print(':2::2:-:0::5:-:2::0::1::7:')
                lcd.cursor(1, 0).print(':0::0:::0::0:::0::1:')
                break;
            default:
                lcdOff()
                counter = 0
                break
        }
    })

    lcd.clear().cursor(0, 0).print('Board is Ready')

    self.wait(3000, function () {
        lcdOff()
    })
});
