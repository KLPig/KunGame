scr = document.getElementById('screen')
ip = document.getElementById('input')

blocks = new Array()
id = -1
lv = 0
kuns = new Array()
score = -50
tm = 100

function generate(){
    tm += 10;
    score += 10 + (lv - lv % 10);
    localStorage.score = score;
    lv++;
    for(var x = 0; x < blocks.length; x++){
        blocks[x].forward(x)
    }
    id++;
    var num = Math.floor(Math.random() * 4)
    kuns.push(num)
    for(var x = 0; x < 4; x++){
        var b = new Block(x, num != x, id, lv)
        blocks.push(b)
        id++;
    }
}

ip.addEventListener(
    'input', 
    function(){
        if(ip.value < 1 || ip.value > 4)
            return;
        if(ip.value - 1 == kuns[lv - 5])
            generate()
        else
            tm -= 50
        ip.value = ''
    }
)

class Block{
    constructor(col, is_kun, id, row){
        if(is_kun){
            self.element = document.createElement('img')
            self.element.src = './resources/kun.png'
        }else{
            self.element = document.createElement('div')
        }
        self.element.className = 'block'
        self.element.style.left = col * 25 + '%'
        self.element.id = 'bk' + id
        scr.appendChild(self.element)
        self.r = row
        self.id = id
        self.ik = is_kun
    }
    forward(id) {
        self.r = Number(id - id % 4) / 4
        self.id = id
        self.element = document.getElementById('bk' + self.id)
        if(lv - self.r > 7)
            return
        if(lv - self.r == 5){
            self.element.className += ' under'
            if(self.element.tagName == 'IMG')
                var func = function(){
                    tm -= 50
                }
            else
                var func = generate
            self.element.addEventListener('click', func)
              
        }
        if(lv - self.r == 6){
            self.element.className = 'block'
        }
        if(lv - self.r == 7){
            scr.removeChild(self.element)
            return
        }
        self.element.style.top = Number(lv - self.r - 2) * 25 + '%'
    }
}

for(var x = 0; x < 5; x++){
    setTimeout(generate, x * 100)
}

setInterval(
    function(){
        tm -= 1 + (id - id % 100) / 100
        localStorage.time = tm
        if(tm <= 0)
            window.open('./score-show.htm', '_self')
    }, 100
)

