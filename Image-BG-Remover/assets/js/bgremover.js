let imageURL;

function submitHandler() {
  console.log("click");
  const fileInput = document.getElementById("fileInput");
  //new functions added
  const submitButton = document.getElementById("submitButton");
  const photoContainer = document.getElementById("photoContainer");
  const uploadedImage = document.getElementById("uploadedImage");

  console.log(fileInput.files);
  const image = fileInput.files[0];

  // Multipart file
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey =
    "8ee622d33477d3b2d711ebe47336714db936105e787c51cde234a65d994f99ae97f8d58710e9cfd0fc31e24f76d8c312";

  fetch("https://clipdrop-api.co/remove-background/v1", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then(function (reponse) {
      return reponse.blob();
    })
    .then(function (blob) {
      console.log(blob);
      const url = URL.createObjectURL(blob);
      imageURL = url;
      const img = document.createElement("img");
      img.src = url;
      img.classList.add("uploaded-image");
      document.body.appendChild(img);

//new one
      submitButton.addEventListener("click", removePhoto);

      function removePhoto() {
        photoContainer.removeChild(uploadedImage);
      }

    })

    .catch();
}

function downloadFile() {
  var a = document.createElement("a"); //<a></a>
  a.href = imageURL;
  a.download = "naciasv.png";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}
