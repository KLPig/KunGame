scr = document.getElementById('screen')

blocks = new Array()
id = -1
lv = 0
kuns = new Array()
score = -5

function generate(){
    score++;
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
                self.element.addEventListener('click', function(){
                    window.open('./score-show.htm', '_self')}
                )
            else
                self.element.addEventListener('click', generate)
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

tm = 100

setInterval(
    function(){
        tm -= 1
        localStorage.time = tm
    }, 100
)

setTimeout(function(){window.open('./score-show.htm', '_self')}, 10000)
