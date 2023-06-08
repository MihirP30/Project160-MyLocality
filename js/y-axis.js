// FILE CREATED FOR CAMERA Y-AXIS MOVEMENTS
AFRAME.registerComponent("y-axis-controls", {
    schema:{
        enabled: {type:"boolean", default:true},
        speed: {type:"number", default:0}
    },
    init: function(){
        window.document.addEventListener("keydown", (e)=>{
            if (this.data.enabled){
                if (e.key === "e"){
                    // UP
                    this.data.speed = 0.025;
                }
                else if (e.key === "q"){
                    // DOWN
                    this.data.speed = -0.025;
                }
                else if (e.key === "r"){
                    // STOP
                    this.data.speed = 0;
                }
            }
        })
    },
    tick: function(){
        var pos = this.el.getAttribute("position");
        pos.y += this.data.speed;
        const {x, y, z} = pos;
        this.el.setAttribute("position", { x: x, y: y, z: z })
    }
})