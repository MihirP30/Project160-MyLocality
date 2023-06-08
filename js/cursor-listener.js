AFRAME.registerComponent("cursor-listener", {
    schema:{
        selectedItemId: {type:"string", default:""},
        selectedItemTitle: {type:"string", default:""},
    },
    init: function(){
        this.handleMouse();
    },
    handleItem: function(selected){
        const id = this.el.getAttribute("id");
        const placesId = ["office", "upstairs", "living_room"];
        
        if (placesId.includes(id)){
            const placeContainer = document.querySelector("#places-container");
            const {state} = placeContainer.getAttribute("tour");
            if (state === "places-list"){
                placeContainer.setAttribute("cursor-listener", {selectedItemId: id});
            };

            var color;
            if (selected) {color = "#3077e3"}
            else {color = "#FFF"};

            this.el.setAttribute("material", {color: color});
        };
    },
    handleMouse: function(){
        this.el.addEventListener("mouseenter", ()=>{
            this.handleItem(true);
        });
        this.el.addEventListener("mouseleave", ()=>{
            this.handleItem(false);
        });
        this.el.addEventListener("click", ()=>{
            this.handleClick();
        })
    },
    handleClick: function(){
        const element = document.querySelector("#places-container");
        const {state} = element.getAttribute("tour");
        if (state === "places-list"){
            const id = this.el.getAttribute("id");
            const placesId = ["office", "upstairs", "living_room"];
            if (placesId.includes(id)){
                element.setAttribute("tour", {state: "view", selectedCard: id});

                const titleEl = document.querySelector("#title");
                titleEl.setAttribute("text", {value: this.data.selectedItemTitle});
            };
        };
    }
});