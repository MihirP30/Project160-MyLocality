AFRAME.registerComponent("tour", {
    schema:{
        state: {type:"string", default:"places-list"},
        selectedCard: {type:"string", default:"#card1"}
    },
    init: function(){
        this.placesContainer = this.el;
        this.createPlace();
    },
    tick: function(){
        const {state} = this.el.getAttribute('tour');
        if (state === 'view'){
          this.hideEl([this.placesContainer]);
          this.showView();
        }
    },
    createPlace: function(){
        const details = {
            office:{
                position: { x: -30, y: 0, z: 20 },
                rotation: { x: 0, y: 127.5, z: 0 },
                src: "./assets/office.jpg",
                title: "Office",
                id: "office"
            },
            upstairs:{
                position: { x: -70, y: 60, z: -40 },
                rotation: { x: 0, y: 50, z: 0 },
                src: "./assets/upstairs.jpg",
                title: "Upstairs",
                id: "upstairs"
            },
            living_room:{
                position: { x: -32.5, y: 0, z: -30 },
                rotation: { x: 0, y: 30, z: 0 },
                src: "./assets/living_room.jpg",
                title: "Living Room",
                id: "living_room"
            },
        };

        for (var key in details){
            const item = details[key];

            const borderEl = this.createBorder(item);
            const thumbnailEl = this.createThumbnail(item);
            const titleEl = this.createTitle(item, borderEl);
            borderEl.appendChild(thumbnailEl);
            borderEl.appendChild(titleEl);

            this.placesContainer.appendChild(borderEl);
        }
    },
    createBorder: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", item.id);
        entityEl.setAttribute("visible", true);

        entityEl.setAttribute("position", item.position);
        entityEl.setAttribute("rotation", item.rotation);

        entityEl.setAttribute("geometry", { primitive: "ring", radiusInner: 5, radiusOuter: 6 });
        entityEl.setAttribute("material", { color: "#FFF" });
        
        entityEl.setAttribute("cursor-listener", { selectedItemTitle: item.title });
        return entityEl;
    },
    createThumbnail: function(item){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);

        entityEl.setAttribute("geometry", { primitive: "circle", radius: 5 });
        entityEl.setAttribute("material", { src: item.src });

        return entityEl;
    },
    createTitle: function(item, borderEl){
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);

        const {x,y,z} = entityEl.getAttribute("position");
        entityEl.setAttribute("position", { x: x, y: y-8, z:z });

        const {color} = borderEl.components.material.attrValue
        entityEl.setAttribute("text", {
            value: item.title,
            width: 40,
            font: "dejavu",
            align: "center",
            color: color
        });

        return entityEl;
    },
    hideEl: function(elList){
        elList.map(el=>{
            el.setAttribute("visible", false);
        });
    },
    showView: function(){
        const {selectedCard} = this.data;
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {src: `./assets/${selectedCard}.jpg`});
    }
});