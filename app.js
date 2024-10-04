// Fayllarni tanlash va PDF yaratish uchun funksiyalar

function createPDF() {
  var input = document.getElementById('imageInput');
  var files = input.files;

  if (files.length === 0) {
      alert("Please select at least one image.");
      return;
  }

  var doc = new PDFDocument(); // PDFKit dan foydalanamiz
  var stream = doc.pipe(blobStream()); // PDF ni blob ko'rinishida saqlaymiz

  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();

      reader.onload = function(event) {
          var img = new Image();
          img.src = event.target.result;

          img.onload = function() {
              doc.image(img.src, {
                  fit: [500, 500], // Rasmni PDF ga joylash
                  align: 'center',
                  valign: 'center'
              });

              if (i < files.length - 1) {
                  doc.addPage(); // Har bir rasm uchun yangi sahifa
              }
          };
      };

      reader.readAsDataURL(file);
  }

  doc.end(); // PDFni tugatish

  stream.on('finish', function() {
      var blob = stream.toBlob('application/pdf');
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'images.pdf'; // Fayl nomini kiritamiz

      link.click(); // Faylni yuklash
  });
}
