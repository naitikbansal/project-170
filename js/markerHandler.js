AFRAME.registerComponent("markerhandler", {
    init: async function () {
      var toys= await this.getToys();

      this.el.addEventListener("markerFound", () => {
        var markerId= this.el.id
        this.handleMarkerFound(toys,markerId);
      });
  
      this.el.addEventListener("markerLost", () => {
        this.handleMarkerLost();
      });
    },
    handleMarkerFound: function (toys,markerId) {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";
  
      var orderButton = document.getElementById("order-button");
      var summaryButtton = document.getElementById("summary-button");
  
      // Handling Click Events
      orderButton.addEventListener("click", function () {
        swal({
          icon: "success",
          title: "Thanks for your order",
          text: "Your order will be delivered soon!!"
        });
      });
  
      summaryButtton.addEventListener("click", () => {
        swal({
          icon: "warning",
          title: "Order Summary",
          text: "Work in progress!!"
        });
      });

      var toy = toys.filter(toy => toy.id === markerId)[0];

      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
    },

    getToys: async function() {
      return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    },
  
    handleMarkerLost: function () {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "none";
    }
  });
  